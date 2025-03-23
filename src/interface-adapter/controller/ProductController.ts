import { Product } from "../../entities/Product";
import { AddProduct } from "../../use-cases/input/product/AddProduct";
import { FindProductsByCategory } from "../../use-cases/input/product/FindProductsByCategory";
import { RemoveProduct } from "../../use-cases/input/product/RemoveProduct";
import { UpdateProduct } from "../../use-cases/input/product/UpdateProduct";
import { HttpServerRequest, HttpServerResponse } from "./http/IHttpServer";

export class ProductController {

    constructor(private addProduct: AddProduct, private updateProduct: UpdateProduct, private removeProduct: RemoveProduct, private findProductsByCategory: FindProductsByCategory) { }

    async create(req: HttpServerRequest<Input>): Promise<HttpServerResponse<Output|undefined>> {
        const product = await this.addProduct.execute(req.body);
        return new HttpServerResponse(this.parseToOutput(product), 201);
    }

    async update(req: HttpServerRequest<Input>): Promise<HttpServerResponse<Output|undefined>> {
        const product = await this.updateProduct.execute(req.params.id, req.body);
        return new HttpServerResponse(this.parseToOutput(product), 200);
    }

    async delete(req: HttpServerRequest<Input>): Promise<HttpServerResponse<null>> {
        await this.removeProduct.execute(req.params.id);
        return new HttpServerResponse(null, 200);
    }

    async findAllByCategory(req: HttpServerRequest<void>): Promise<HttpServerResponse<(Output|undefined)[]>> {
        const products = await this.findProductsByCategory.execute(req.params.category);
        return new HttpServerResponse(products.map(this.parseToOutput), 200);
    }

    private parseToOutput(product: Product): Output | undefined {
        if (product)
            return { id: product.id, name: product.name, description: product.description, price: product.price, category: product.category }
        return undefined;
    }
}

export interface Input {
    name: string;
    description: string;
    price: number;
    category: string;
}

export interface Output extends Input {
    id: string | undefined;
}