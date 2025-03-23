import { Product } from "../../../entities/Product";


export interface AddProduct {
    execute(input: Input): Promise<Product>;
}

export interface Input {
    name: string;
    description: string;
    price: number;
    category: string;
}