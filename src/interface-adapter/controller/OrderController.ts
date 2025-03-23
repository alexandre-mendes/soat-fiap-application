import { Order } from "../../entities/Order";
import { CheckoutOrder } from "../../use-cases/input/order/CheckoutOrder";
import { FindAllOrders } from "../../use-cases/input/order/FindAllOrders";
import { PaymentOrderUpdate } from "../../use-cases/input/order/PaymentOrderUpdate";
import { ProgressOrder } from "../../use-cases/input/order/ProgressOrder";
import { HttpServerRequest, HttpServerResponse } from "./http/IHttpServer";



export class OrderController {

    constructor(
        private checkoutOrder: CheckoutOrder, 
        private findAllOrders: FindAllOrders, 
        private progressOrder: ProgressOrder,
        private paymentOrderUpdate: PaymentOrderUpdate) { }

    async checkout(req: HttpServerRequest<Input>): Promise<HttpServerResponse<Output>> {
        const order = await this.checkoutOrder.execute(req.body);
        return new HttpServerResponse(this.parseToOutput(order), 201);
    }

    async findAll(req: HttpServerRequest<null>): Promise<HttpServerResponse<OutputList>> {
        const outputList = await this.findAllOrders.execute();
        const output = {
            ready: this.parseToOutputItem(outputList.ready),
            inPreparation: this.parseToOutputItem(outputList.inPreparation),
            received: this.parseToOutputItem(outputList.received) 
        };
        return new HttpServerResponse(output, 200);
    }

    async progress(req: HttpServerRequest<null>): Promise<HttpServerResponse<Output>> {
        const outputList = await this.progressOrder.execute(req.params.id);
        return new HttpServerResponse(outputList, 200);
    }

    async payment(req: HttpServerRequest<PaymentInput>): Promise<HttpServerResponse<null>> {
        this.paymentOrderUpdate.execute(req.params.id, req.body.approved);
        return new HttpServerResponse(null, 200);
    }

    private parseToOutput(order: Order): Output {
        return { id: order.id, number: order.number };
    }

    private parseToOutputItem(orders: Order[]): OutputItem[] {
        return orders.map(o => {
            return {
            id: o.id,
                number: o.number,
                clientName: o.client?.name,
                status: o.status,
                createdAt: o.createdAt,
                waitingTime: o.waitingTime
        } as OutputItem})
    }
}

export interface PaymentInput {
    approved: boolean
}

export interface Input {
    clientId: string;
    items: ItemInput[];
}

interface ItemInput {
    productId: string; 
    quantity: number; 
    observation: string;
}

export interface Output {
    id: string | undefined;
    number: number;
}

export interface OutputList {
    ready: OutputItem[],
    inPreparation: OutputItem[],
    received: OutputItem[]
}

export interface OutputItem {
    id: string,
    number: number,
    clientName: string,
    status: string,
    createdAt: Date
}