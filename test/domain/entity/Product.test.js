"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../../../src/domain/entity/Product");
describe('Testa criação de produto', () => {
    test('Deve criar produto com sucesso', () => {
        const name = 'X Tudo';
        const description = 'Pão brioche com tudo';
        const price = 17.85;
        const category = 'LANCHE';
        const product = new Product_1.Product(name, description, price, category);
        expect(product).toBeDefined();
        expect(product.name).toEqual(name);
        expect(product.description).toEqual(description);
        expect(product.price).toEqual(price);
        expect(product.category).toEqual(category);
    });
    test('Deve informar que o nome é obrigatório', () => {
        expect(() => new Product_1.Product('', 'Pão brioche com tudo', 17.85, 'LANCHE')).toThrow('O nome é obrigatório.');
    });
    test('Deve informar que a descrição é obrigatória', () => {
        expect(() => new Product_1.Product('X Tudo', '', 17.85, 'LANCHE')).toThrow('A descrição é obrigatória.');
    });
    test('Deve informar que o preço é obrigatório', () => {
        expect(() => new Product_1.Product('X Tudo', 'Pão brioche com tudo', -1, 'LANCHE')).toThrow('O preço é obrigatório.');
    });
    test('Deve informar que a categoria é obrigatória', () => {
        expect(() => new Product_1.Product('X Tudo', 'Pão brioche com tudo', 17.85, '')).toThrow('A categoria é obrigatória.');
    });
});
