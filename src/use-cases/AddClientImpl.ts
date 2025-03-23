import { Client } from "../entities/Client";
import { DomainError } from "../entities/error/DomainError";
import { AddClient, Input } from "./input/client/AddClient";
import { FindClient } from "./output/client/FindClient";
import { SaveClient } from "./output/client/SaveClient";

export class AddClientImpl implements AddClient {

    constructor(private findClient: FindClient, private saveClient: SaveClient) { }

    async execute(input: Input): Promise<Client> {
        const finded = await this.findClient.findByCpf(input.cpf);

        if (finded)
            throw new DomainError('O CPF informado já possui cadastro.')

        const client = new Client(input.cpf, input.name, input.email);
        return await this.saveClient.save(client);
    }
}