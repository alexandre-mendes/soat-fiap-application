import { IClientService, Input, Output } from "../../../core/port/IClientService";
import { HttpServerRequest, HttpServerResponse } from "../http/IHttpServer";



export class ClientController {

    constructor(private clientService: IClientService) {
    }

    async create(req: HttpServerRequest<Input>): Promise<HttpServerResponse<Output>> {
        const client = await this.clientService.create(req.body);
        return new HttpServerResponse(client, 201);
    }

    async findByCpf(req: HttpServerRequest<Input>): Promise<HttpServerResponse<Output>> {
        const client = await this.clientService.findByCpf(req.params.cpf);
        return new HttpServerResponse(client, 200);
    }
}

