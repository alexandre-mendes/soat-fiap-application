import { CategoryType, Product } from "../entities/Product";
import { FindProductsByCategory } from "./input/product/FindProductsByCategory";
import { FindProduct } from "./output/product/FindProduct";

export class FindProductsByCategoryImpl implements FindProductsByCategory {

    constructor(private findProduct: FindProduct) { }

    async execute(category: string): Promise<Product[]> {
        return await this.findProduct.findAllByCategory(category as CategoryType);
    }

}