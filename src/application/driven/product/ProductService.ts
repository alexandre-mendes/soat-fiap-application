import { CategoryType, Product } from "../../../domain/entity/Product";
import { DomainError } from "../../../domain/error/DomainError";
import { IProductRepository } from "../../driver/products/IProductRepository";
import { Input, IProductService, Output } from "./IProductService";

export class ProductService implements IProductService {

    constructor(private productRepository: IProductRepository) { }

    async create(input: Input): Promise<Output> {
        const finded = await this.productRepository.findByNameAndCategory(input.name, input.category);

        if (finded)
            throw new DomainError('Já existe um produto com o mesmo nome e categoria.')

        const product = new Product(input.name, input.description, input.price, input.category as CategoryType);
        const saved = await this.productRepository.save(product);
        return this.parseToOutput(saved);
    }

    async findAllByCategory(category: string): Promise<Output[]> {
        const products = await this.productRepository.findAllByCategory(category);
        return products.map(this.parseToOutput);
    }

    async update(id: string, input: Input): Promise<Output> {
        const product = await this.productRepository.findById(id);

        if (!product)
            throw new DomainError('Não foi localizado nenhum produto para o id informado.');

        product.update(input);
        const updated = await this.productRepository.update(product);
        return this.parseToOutput(updated);
    }

    async deleteById(id: string): Promise<void> {
        await this.productRepository.deleteById(id);
    }

    private parseToOutput(product: Product): Output {
        return { id: product.id, name: product.name, description: product.description, price: product.price, category: product.category };
    }
}