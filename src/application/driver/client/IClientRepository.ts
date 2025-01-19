import { Client } from "../../../domain/entity/Client";

export interface IClientRepository {
    save(client: Client): Promise<Client>;
    findByCpf(cpf: String): Promise<Client | undefined>;
    findById(id: string): Promise<Client | undefined>;
}