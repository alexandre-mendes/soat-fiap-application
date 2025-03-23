import { Client } from "../../../entities/Client";


export interface FindClientByCpf {
    execute(cpf: string): Promise<Client|undefined>;
}