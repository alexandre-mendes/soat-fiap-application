import { DomainError } from "../entities/error/DomainError";
import { PaymentOrderUpdate } from "./input/order/PaymentOrderUpdate";
import { FindOrder } from "./output/order/FindOrder";
import { SaveOrder } from "./output/order/SaveOrder";

export class PaymentOrderUpdateImpl implements PaymentOrderUpdate {

    constructor(private findOrder: FindOrder, private saveOrder: SaveOrder) { }

    async execute(id: string, approved: boolean): Promise<void> {
        const order = await this.findOrder.findById(id);

        if (!order)
            throw new DomainError('Pedido não localizado')

        if (approved) {
            order?.paymentApproved();
            this.saveOrder.save(order);
        }
    }

}