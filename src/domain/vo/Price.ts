import { DomainError } from "../error/DomainError";

export class Price {

    constructor(readonly value: number) {
        if (!value)
            throw new DomainError('O preço precisa de algum valor válido.');

        if (value < 0)
            throw new DomainError('O preço não pode ser menor que zero.')
    }
}