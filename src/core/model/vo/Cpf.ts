import { DomainError } from "../error/DomainError";

export class Cpf {

    constructor(readonly value: string) {
        // Remove os caracteres não numéricos
        value = value.replace(/\D/g, '');

        // Verifica se o CPF tem exatamente 11 dígitos
        if (value.length !== 11) {
            throw new DomainError('O tamanhdo do CPF é inválido.');
        }

        // Verifica se o CPF é uma sequência de números iguais (ex: 111.111.111-11)
        if (/^(\d)\1{10}$/.test(value)) {
            throw new DomainError('Sequencia de números iguais é inválida');
        }

        // Calculando o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(value.charAt(i)) * (10 - i);
        }
        let primeiroDigito = (soma * 10) % 11;
        if (primeiroDigito === 10 || primeiroDigito === 11) {
            primeiroDigito = 0;
        }

        // Verifica se o primeiro dígito verificador é válido
        if (parseInt(value.charAt(9)) !== primeiroDigito) {
            throw new DomainError('CPF inválido');
        }

        // Calculando o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(value.charAt(i)) * (11 - i);
        }
        let segundoDigito = (soma * 10) % 11;
        if (segundoDigito === 10 || segundoDigito === 11) {
            segundoDigito = 0;
        }

        // Verifica se o segundo dígito verificador é válido
        if (parseInt(value.charAt(10)) !== segundoDigito) {
            throw new DomainError('CPF inválido');
        }
    }
}