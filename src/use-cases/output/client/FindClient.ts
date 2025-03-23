import { Client } from "../../../entities/Client";


export interface FindClient {
    
    findByCpf(cpf: any): Promise<Client | undefined>;
    findById(id: string): Promise<Client | undefined>
}