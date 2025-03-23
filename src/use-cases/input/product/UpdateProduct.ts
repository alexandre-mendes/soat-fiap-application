import { Product } from "../../../entities/Product";


export interface UpdateProduct {
    execute(id: string, input: Input): Promise<Product>;
}

export interface Input {
    name: string;
    description: string;
    price: number;
    category: string;
}