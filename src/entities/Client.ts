import { DomainError } from "./error/DomainError";
import { Cpf } from "./vo/Cpf";
import { Email } from "./vo/Email";

export class Client {

    private _id: string | undefined;
    private _cpf: Cpf;
    private _name: string;
    private _email: Email;

    constructor(cpf: string, name: string, email: string) {
        if (!cpf)
            throw new DomainError('O CPF é obrigatório')

        if (!name)
            throw new DomainError('O nome é obrigatório')

        if (!email)
            throw new DomainError('O email é obrigatório')

        this._cpf = new Cpf(cpf);
        this._name = name;
        this._email = new Email(email);
    }

    get cpf() {
        return this._cpf?.value;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email?.value;
    }

    get id() {
        return this._id;
    }

    set id(id: string | undefined) {
        this._id = id;
    }
}