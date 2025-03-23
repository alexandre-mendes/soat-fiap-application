import { Product } from "../../../entities/Product";


export interface SaveProduct {
    save(product: Product): Promise<Product>;

}