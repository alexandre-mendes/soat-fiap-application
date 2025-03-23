import { CheckoutOrder, Input } from "./input/order/CheckoutOrder";
import { FindClient } from "./output/client/FindClient";
import { FindProduct } from "./output/product/FindProduct";
import { SaveOrder } from "./output/order/SaveOrder";
import { DomainError } from "../entities/error/DomainError";
import { Order, OrderItem } from "../entities/Order";
import { MercadoPago } from "./output/mercado-pago/MercadoPago";

export class CheckoutOrderImpl implements CheckoutOrder {

    constructor(private findClient: FindClient, 
        private findProduct: FindProduct, 
        private saveOrder: SaveOrder, 
        private mercadoPago: MercadoPago) { }

    async execute(input: Input): Promise<Order> {
        const client = await this.findClient.findById(input.clientId);

        if (input.clientId && !client)
            throw new DomainError('Não foi possivel localizar um cliente para o id informado.');

        if (!input.items || input.items.length === 0)
            throw new DomainError('Pedido inválido, informe ao menos um item.');

        const items = await Promise.all(input.items.map(async i => {
            const product = await this.findProduct.findById(i.productId);

            if (!product)
                throw new DomainError(`Não foi possivel localizar um produto para o id ${i.productId}.`);

            return new OrderItem(product, i.quantity, i.observation);
        }));

        const order = new Order(client, items);
        const created = await this.saveOrder.save(order);

        if (created?.id)
            this.mercadoPago.generateQrCode(created?.id, created.total);

        return created;
    }

}