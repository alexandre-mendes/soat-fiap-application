import { DomainError } from "../entities/error/DomainError";
import { PaymentInfo, PaymentInfoOutput } from "./input/order/PaymentInfo";
import { FindOrder } from "./output/order/FindOrder";

export class PaymentInfoImpl implements PaymentInfo {

    constructor(private findOrder: FindOrder) {}

    async execute(orderId: string): Promise<PaymentInfoOutput> {
        const order = await this.findOrder.findById(orderId);
        
        if (!order)
            throw new DomainError('Pedido não localizado');

        return { id: order.id || '', number: order.number, approved: !order.paymentPending }
    }
}