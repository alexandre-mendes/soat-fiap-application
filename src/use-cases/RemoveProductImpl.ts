import { RemoveProduct } from "./input/product/RemoveProduct";
import { DeleteProduct } from "./output/product/DeleteProduct";

export class RemoveProductImpl implements RemoveProduct {

    constructor(private deleteProduct: DeleteProduct) { }

    async execute(id: string): Promise<void> {
        await this.deleteProduct.deleteById(id);
    }
}