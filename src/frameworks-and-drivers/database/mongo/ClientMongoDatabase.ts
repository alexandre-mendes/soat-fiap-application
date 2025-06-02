import { DBOperation, DBQuery, Filter, IDatabase } from "../../../interface-adapter/repositories/IDatabase";
import { DynamoDb } from "../../config/DynamoConfig";

export interface IClient {
  id?: string,
  name: string;
  email: string;
  cpf: string;
}

export class ClientMongoDatabase implements IDatabase<IClient> {

  constructor(private dynamo: DynamoDb) { }

  async save(entity: IClient): Promise<IClient> {
    if (!entity.id)
      entity.id = crypto.randomUUID();

    await this.dynamo.putItem('client', entity);
    return entity;
  }

  async update(entity: IClient): Promise<IClient> {
    return await this.save(entity);
  }

  async deleteById(id: string): Promise<void> {
    await this.dynamo.deleteItem('client', { id })
  }

  async findById(id: string): Promise<IClient | null> {
    return await this.dynamo.getItem('client', { id }) as IClient;
  }

  async findByQuery(query: DBQuery): Promise<IClient> {
    const results = await this.findAllByQuery(query);
    return results[0] ?? null;
  }

  async findAllByQuery(query: DBQuery): Promise<IClient[]> {
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

    const result = await this.dynamo.scanByField<IClient>({
      tableName: 'client',
      filterExpression,
      expressionValues,
      expressionNames,
    });

    return result;
  }

}