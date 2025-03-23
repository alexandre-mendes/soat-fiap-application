import { DomainError } from "../entities/error/DomainError";
import { CategoryType, Product } from "../entities/Product";
import { AddProduct, Input } from "./input/product/AddProduct";
import { FindProduct } from "./output/product/FindProduct";
import { SaveProduct } from "./output/product/SaveProduct";

export class AddProductImpl implements AddProduct {

    constructor(private findProduct: FindProduct, private saveProduct: SaveProduct) { }

    async execute(input: Input): Promise<Product> {
        const finded = await this.findProduct.findByNameAndCategory(input.name, input.category);

        if (finded)
            throw new DomainError('Já existe um produto com o mesmo nome e categoria.')

        const product = new Product(input.name, input.description, input.price, input.category as CategoryType);
        return await this.saveProduct.save(product);
    }

}