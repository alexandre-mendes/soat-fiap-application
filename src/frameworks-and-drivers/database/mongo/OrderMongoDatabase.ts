import { DBOperation, DBQuery, Filter, IDatabase } from "../../../interface-adapter/repositories/IDatabase";
import { DynamoDb } from "../../config/DynamoConfig";

export interface IOrder {
    id: string | undefined;
    number: number;
    client: { id: string, name: string, email: string, cpf: string } | undefined;
    items: {
        product: { id: string, name: string, description: string, price: number, category: string },
        quantity: number,
        observation: string
    }[];
    total: number;
    paymentPending: boolean;
    status: string | undefined;
    createdAt: string;
}

export class OrderMongoDatabase implements IDatabase<IOrder> {

    constructor(private dynamo: DynamoDb) { }

    async save(entity: IOrder): Promise<IOrder> {
        if (!entity.id)
            entity.id = crypto.randomUUID();

        await this.dynamo.putItem('order', entity);
        return entity;
    }

    async update(entity: IOrder): Promise<IOrder> {
        return await this.save(entity);
    }

    async deleteById(id: string): Promise<void> {
        await this.dynamo.deleteItem('order', { id })
    }

    async findById(id: string): Promise<IOrder | null> {
        return await this.dynamo.getItem('order', { id }) as IOrder;
    }

    async findByQuery(query: DBQuery): Promise<IOrder> {
        const results = await this.findAllByQuery(query);
        return results[0] ?? null;
    }

    async findAllByQuery(query: DBQuery): Promise<IOrder[]> {
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

        const result = await this.dynamo.scanByField<IOrder>({
            tableName: 'order',
            filterExpression,
            expressionValues,
            expressionNames,
        });

        return result;
    }

}