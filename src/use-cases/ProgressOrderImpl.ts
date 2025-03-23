import { DomainError } from "../entities/error/DomainError";
import { Order } from "../entities/Order";
import { ProgressOrder } from "./input/order/ProgressOrder";
import { FindOrder } from "./output/order/FindOrder";
import { SaveOrder } from "./output/order/SaveOrder";

export class ProgressOrderImpl implements ProgressOrder {

    constructor(private findOrder: FindOrder, private saveOrder: SaveOrder) { }

    async execute(id: string): Promise<Order> {
        const order = await this.findOrder.findById(id);

        if (!order)
            throw new DomainError('Pedido não encontrado.');

        if (order.paymentPending)
            throw new DomainError('Pedido com pagamento pendente.');

        order.progress();
        return await this.saveOrder.save(order);
    }
}