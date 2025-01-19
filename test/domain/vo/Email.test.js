"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Email_1 = require("../../../src/domain/vo/Email");
describe('Testa criação de e-mail', () => {
    test('Deve criar email com sucesso', () => {
        expect(new Email_1.Email('alexandre@fiap.com')).toBeDefined();
    });
    test('Deve acusar email inválido', () => {
        expect(() => new Email_1.Email('alexandre@fiap')).toThrow('E-mail inválido.');
    });
});
