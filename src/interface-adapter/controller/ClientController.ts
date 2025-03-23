import { HttpServerRequest, HttpServerResponse } from "./http/IHttpServer";
import { AddClient } from "../../use-cases/input/client/AddClient";
import { FindClientByCpf } from "../../use-cases/input/client/FindClientByCpf";
import { Client } from "../../entities/Client";

export class ClientController {

    constructor(private addClient: AddClient, private findClientByCpf: FindClientByCpf) {
    }

    async create(req: HttpServerRequest<Input>): Promise<HttpServerResponse<Output|undefined>> {
        const client = await this.addClient.execute(req.body);
        return new HttpServerResponse(this.parseToOutput(client), 201);
    }

    async findByCpf(req: HttpServerRequest<Input>): Promise<HttpServerResponse<Output | undefined>> {
        const client = await this.findClientByCpf.execute(req.params.cpf);
        return new HttpServerResponse(this.parseToOutput(client), 200);
    }

    private parseToOutput(client: Client | undefined): Output | undefined {
        if (client)
            return { id: client.id, cpf: client.cpf, name: client.name, email: client.email }
        return undefined;
    }
}

export interface Input {
    cpf: string,
    name: string,
    email: string
}

export interface Output extends Input {
    id: string | undefined
}
