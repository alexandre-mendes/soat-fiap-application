import { Input, IProductService, Output } from "../../../application/driven/product/IProductService";
import { HttpServerRequest, HttpServerResponse } from "../../http/IHttpServer";

export class ProductController {

    constructor(private productService: IProductService) { }

    async create(req: HttpServerRequest<Input>): Promise<HttpServerResponse<Output>> {
        const product = await this.productService.create(req.body);
        return new HttpServerResponse(product, 201);
    }

    async update(req: HttpServerRequest<Input>): Promise<HttpServerResponse<Output>> {
        const product = await this.productService.update(req.params.id, req.body);
        return new HttpServerResponse(product, 200);
    }

    async delete(req: HttpServerRequest<Input>): Promise<HttpServerResponse<null>> {
        await this.productService.deleteById(req.params.id);
        return new HttpServerResponse(null, 200);
    }

    async findAllByCategory(req: HttpServerRequest<void>): Promise<HttpServerResponse<Output[]>> {
        const products = await this.productService.findAllByCategory(req.params.category);
        return new HttpServerResponse(products, 200);
    }
}