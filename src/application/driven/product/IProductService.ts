export interface IProductService {
    findAllByCategory(category: string): Promise<Output[]>;
    create(input: Input): Promise<Output>;
    update(id: string, input: Input): Promise<Output>;
    deleteById(id: string): Promise<void>;
}

export interface Input {
    name: string;
    description: string;
    price: number;
    category: string;
}

export interface Output extends Input {
    id: string | undefined;
}