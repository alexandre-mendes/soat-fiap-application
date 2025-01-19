import { Input, IOrderService, Output, OutputList } from "../../../application/driven/order/IOrderService";
import { HttpServerRequest, HttpServerResponse } from "../../http/IHttpServer";

export class OrderController {

    constructor(private orderService: IOrderService) {

    }

    async checkout(req: HttpServerRequest<Input>): Promise<HttpServerResponse<Output>> {
        const order = await this.orderService.checkout(req.body);
        return new HttpServerResponse(order, 201);
    }

    async findAll(req: HttpServerRequest<null>): Promise<HttpServerResponse<OutputList>> {
        const outputList = await this.orderService.findAll();
        return new HttpServerResponse(outputList, 200);
    }

    async progress(req: HttpServerRequest<null>): Promise<HttpServerResponse<Output>> {
        const outputList = await this.orderService.progress(req.params.id);
        return new HttpServerResponse(outputList, 200);
    }
}