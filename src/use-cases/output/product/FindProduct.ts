import { CategoryType, Product } from "../../../entities/Product";


export interface FindProduct {
    findAllByCategory(category: CategoryType): Promise<Product[]>;
    findByNameAndCategory(name: string, category: string): Promise<Product|undefined>;
    findById(productId: string): Promise<Product|undefined>;

}