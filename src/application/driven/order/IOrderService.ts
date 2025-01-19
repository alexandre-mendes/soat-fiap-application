export interface IOrderService {
    progress(id: string): Promise<Output>;
    findAll(): Promise<OutputList>;
    checkout(input: Input): Promise<Output>;
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
    finalized: OutputItem[],
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