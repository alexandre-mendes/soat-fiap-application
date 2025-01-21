import { Client } from "../model/entity/Client";
import { DomainError } from "../model/error/DomainError";
import { IClientRepository } from "../port/IClientRepository";
import { IClientService, Input, Output } from "../port/IClientService";

export class ClientService implements IClientService {

    constructor(private clientRepository: IClientRepository) { }

    async create(input: Input): Promise<Output> {
        const finded = await this.clientRepository.findByCpf(input.cpf);

        if (finded)
            throw new DomainError('O CPF informado já possui cadastro.')

        const client = new Client(input.cpf, input.name, input.email);
        const saved = await this.clientRepository.save(client);
        return this.parseToOutput(saved);
    }

    async findByCpf(cpf: string): Promise<Output> {
        const client = await this.clientRepository.findByCpf(cpf);

        if (client)
            return this.parseToOutput(client);
        else
            return {} as Output;
    }

    private parseToOutput(client: Client): Output {
        return { id: client.id, cpf: client.cpf, name: client.name, email: client.email }
    }
}