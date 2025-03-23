import { Order } from "../../../entities/Order";


export interface SaveOrder {
    
    save(order: Order): Promise<Order>;

}