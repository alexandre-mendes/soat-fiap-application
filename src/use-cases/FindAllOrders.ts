import { Status } from "../entities/Order";
import { FindAllOrders, OutputList } from "./input/order/FindAllOrders";
import { FindOrder } from "./output/order/FindOrder";

export class FindAllOrdersImpl implements FindAllOrders {

    constructor(private findOrder: FindOrder) { }

    async execute(): Promise<OutputList> {
        const orders = await this.findOrder.findAll()

        const ready = orders.filter(o => Status.READY === o.status);
        const received = orders.filter(o => Status.RECEIVED === o.status);
        const inPreparation = orders.filter(o => Status.IN_PREPARATION === o.status);

        return { ready, received, inPreparation }
    }
}