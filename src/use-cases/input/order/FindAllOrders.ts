import { Order } from "../../../entities/Order";


export interface FindAllOrders {
    execute(): Promise<OutputList>;
}

export interface OutputList {
    ready: Order[],
    received: Order[],
    inPreparation: Order[]
}