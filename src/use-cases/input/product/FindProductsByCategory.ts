import { Product } from "../../../entities/Product";

export interface FindProductsByCategory {
    execute(category: string): Promise<Product[]>;
}