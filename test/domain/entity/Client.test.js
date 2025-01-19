"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../../../src/domain/entity/Client");
describe('Testa criação de cliente', () => {
    test('Deve criar cliente com sucesso', () => {
        const cpf = '38010960098';
        const name = 'Alexandre';
        const email = 'alexandre@fiap.com';
        const client = new Client_1.Client(cpf, name, email);
        expect(client).toBeDefined();
        expect(client.cpf).toEqual(cpf);
        expect(client.name).toEqual(name);
        expect(client.email).toEqual(email);
    });
    test('Deve informar que o CPF é obrigatório', () => {
        expect(() => new Client_1.Client('', 'Alexandre', 'alexandre.fiap.com')).toThrow('O CPF é obrigatório');
    });
    test('Deve informar que o nome é obrigatório', () => {
        expect(() => new Client_1.Client('38010960098', '', 'alexandre.fiap.com')).toThrow('O nome é obrigatório');
    });
    test('Deve informar que o email é obrigatório', () => {
        expect(() => new Client_1.Client('38010960098', 'Alexandre', '')).toThrow('O email é obrigatório');
    });
});
