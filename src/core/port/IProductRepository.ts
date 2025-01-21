import { Product } from "../model/entity/Product";

export interface IProductRepository {
    findById(id: string): Promise<Product | null>;
    findAllByCategory(category: string): Promise<Product[]>;
    findByNameAndCategory(name: string, category: string): Promise<Product|undefined>;
    save(product: Product): Promise<Product>;
    update(product: Product): Promise<Product>;
    deleteById(id: string): Promise<void>;
}