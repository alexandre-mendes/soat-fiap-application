export interface IClientService {

    create(input: Input): Promise<Output>;
    findByCpf(cpf: string): Promise<Output>;
}

export interface Input {
    cpf: string,
    name: string,
    email: string
}

export interface Output extends Input {
    id: string | undefined
}