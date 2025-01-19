import { Order } from "../../../domain/entity/Order";

export interface IOrderRepository {
    update(order: Order): Promise<Order>;
    findAll(): Promise<Order[]>;
    findById(id: string): Promise<Order | undefined>;
    save(order: Order): Promise<Order>;
}