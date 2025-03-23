import { Order } from "../../../entities/Order";


export interface FindOrder {

    findById(id: string): Promise<Order | undefined>;
    findAll(): Promise<Order[]>;

}