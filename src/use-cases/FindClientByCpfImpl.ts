import { Client } from "../entities/Client";
import { FindClientByCpf } from "./input/client/FindClientByCpf";
import { FindClient } from "./output/client/FindClient";


export class FindClientByCpfImpl implements FindClientByCpf {

    constructor(private findClient: FindClient) { }

    async execute(cpf: string): Promise<Client|undefined> {
        return await this.findClient.findByCpf(cpf);
    }
}