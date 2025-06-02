import { DBOperation, DBQuery, Filter, IDatabase } from "../../../interface-adapter/repositories/IDatabase";
import { DynamoDb } from "../../config/DynamoConfig";

export interface IProduct {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

export class ProductMongoDatabase implements IDatabase<IProduct> {

    constructor(private dynamo: DynamoDb) { }

    async save(entity: IProduct): Promise<IProduct> {
        if (!entity.id)
            entity.id = crypto.randomUUID();

        await this.dynamo.putItem('product', entity);
        return entity;
    }

    async update(entity: IProduct): Promise<IProduct> {
        return await this.save(entity);
    }

    async deleteById(id: string): Promise<void> {
        await this.dynamo.deleteItem('product', { id })
    }

    async findById(id: string): Promise<IProduct | null> {
        return await this.dynamo.getItem('product', { id }) as IProduct;
    }

    async findByQuery(query: DBQuery): Promise<IProduct> {
        const results = await this.findAllByQuery(query);
        return results[0] ?? null;
    }

    async findAllByQuery(query: DBQuery): Promise<IProduct[]> {
        const expressionParts: string[] = [];
        const expressionValues: Record<string, any> = {};
        const expressionNames: Record<string, string> = {};

        query.andCriteria.forEach((criteria, i) => {
            const valuePlaceholder = `:v${i}`;
            const keyAlias = `#k${i}`;

            expressionNames[keyAlias] = criteria.key;
            expressionValues[valuePlaceholder] = criteria.value;

            switch (criteria.operation) {
                case DBOperation.EQUALS:
                    expressionParts.push(`${keyAlias} = ${valuePlaceholder}`);
                    break;
                case DBOperation.NOT_EQUALS:
                    expressionParts.push(`${keyAlias} <> ${valuePlaceholder}`);
                    break;
                default:
                    throw new Error(`Operação não suportada: ${criteria.operation}`);
            }
        });

        const filterExpression = expressionParts.join(' AND ');

        const result = await this.dynamo.scanByField<IProduct>({
            tableName: 'product',
            filterExpression,
            expressionValues,
            expressionNames,
        });

        return result;
    }

}