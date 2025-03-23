import { Client } from "../../../entities/Client";


export interface AddClient {
    execute(input: Input): Promise<Client>;
}

export interface Input {
    cpf: string,
    name: string,
    email: string
}