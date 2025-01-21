import { Order, OrderItem, Status } from "../../../domain/entity/Order";
import { DomainError } from "../../../domain/error/DomainError";
import { IClientRepository } from "../../driver/client/IClientRepository";
import { IMercadoPagpGateway } from "../../driver/mercadopago/IMercadoPagoGateway";
import { IOrderRepository } from "../../driver/order/IOrderRepository";
import { IProductRepository } from "../../driver/products/IProductRepository";
import { Input, IOrderService, Output, OutputItem, OutputList } from "./IOrderService";

export class OrderService implements IOrderService {

    constructor(
        private orderRepository: IOrderRepository,
        private clientRepository: IClientRepository,
        private productRepository: IProductRepository,
        private mercadoPagoGateway: IMercadoPagpGateway) {
    }

    async progress(id: string): Promise<Output> {
        const order = await this.orderRepository.findById(id);

        if (!order)
            throw new DomainError('Pedido não encontrado.');

        order.progress();
        const updated = await this.orderRepository.update(order);
        return this.parseToOutput(updated);
    }

    async findAll(): Promise<OutputList> {
        const finded = await this.orderRepository.findAll()
        const orders = finded.map(o => {
            return {
                id: o.id,
                number: o.number,
                clientName: o.client?.name,
                status: o.status,
                createdAt: o.createdAt,
                waitingTime: o.waitingTime
            } as OutputItem
        });
        const finalized = orders.filter(o => Status.FINALIZED === o.status);
        const ready = orders.filter(o => Status.READY === o.status);
        const received = orders.filter(o => Status.RECEIVED === o.status);
        const inPreparation = orders.filter(o => Status.IN_PREPARATION === o.status);

        return { finalized, ready, received, inPreparation }
    }

    async checkout(input: Input): Promise<Output> {
        const client = await this.clientRepository.findById(input.clientId);

        if (input.clientId && !client)
            throw new DomainError('Não foi possivel localizar um cliente para o id informado.');

        if (!input.items || input.items.length === 0) 
            throw new DomainError('Pedido inválido, informe ao menos um item.');

        const items = await Promise.all(input.items.map(async i => {
            const product = await this.productRepository.findById(i.productId);

            if (!product)
                throw new DomainError(`Não foi possivel localizar um produto para o id ${i.productId}.`);

            return new OrderItem(product, i.quantity, i.observation);
        }));

        const order = new Order(client, items);
        const created = await this.orderRepository.save(order);

        //Fake
        await this.mercadoPagoGateway.pay(created.id as string, this.paymentApproved.bind(this));

        return this.parseToOutput(created);
    }

    private async paymentApproved(id: string): Promise<void> {
        const order = await this.orderRepository.findById(id);

        if (!order)
            return;

        order.paymentApproved();
        await this.orderRepository.save(order);
    }

    private parseToOutput(order: Order): Output {
        return { id: order.id, number: order.number };
    }
}