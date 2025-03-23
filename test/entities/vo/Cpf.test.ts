import { Cpf } from "../../../src/domain/vo/Cpf";

describe("Testa criação do VO Cpf", () => {

    test("Deve criar o CPF com sucesso", () => {
        expect(new Cpf("380.109.600-98")).toBeDefined();
    });

    test("Deve falhar devido o tamanho do CPF", () => {
        expect(() => new Cpf("3801096009811")).toThrow('O tamanhdo do CPF é inválido.');
    });

    test("Deve falhar devido sequencia repetida", () => {
        expect(() => new Cpf("11111111111")).toThrow('Sequencia de números iguais é inválida');
    });
});