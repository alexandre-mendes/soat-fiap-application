import { Order } from "../../../entities/Order";


export interface CheckoutOrder {
    execute(input: Input): Promise<Order>;
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