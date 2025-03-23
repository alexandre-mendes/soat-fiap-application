import { DomainError } from "../entities/error/DomainError";
import { Product } from "../entities/Product";
import { Input, UpdateProduct } from "./input/product/UpdateProduct";
import { FindProduct } from "./output/product/FindProduct";
import { SaveProduct } from "./output/product/SaveProduct";

export class UpdateProductImpl implements UpdateProduct {

    constructor(private findProduct: FindProduct, private saveProduct: SaveProduct) { }

    async execute(id: string, input: Input): Promise<Product> {
        const product = await this.findProduct.findById(id);

        if (!product)
            throw new DomainError('Não foi localizado nenhum produto para o id informado.');

        product.update(input);
        return await this.saveProduct.save(product);
    }

}