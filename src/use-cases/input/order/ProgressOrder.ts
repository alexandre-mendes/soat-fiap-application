import { Order } from "../../../entities/Order";


export interface ProgressOrder {
    execute(id: string): Promise<Order>;
}