import {
  CreateTableCommand,
  CreateTableCommandInput,
  DynamoDBClient,
  DynamoDBClientConfig,
  ListTablesCommand,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
  ScanCommand
} from '@aws-sdk/lib-dynamodb';

export class DynamoDb {

  private readonly ddbClient: DynamoDBClient;
  private readonly client: DynamoDBDocumentClient;

  constructor() {
    const config: DynamoDBClientConfig ={
      region: process.env.AWS_REGION,
      endpoint: process.env.AWS_DYNAMO_ENDPOINT,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        sessionToken: process.env.AWS_SESSION_TOKEN
      },
    }

    console.log('CONFIGGG: ', config)

    this.ddbClient = new DynamoDBClient(config || {});
    this.client = DynamoDBDocumentClient.from(this.ddbClient);

    Promise.all([
      this.createTableIfNotExists('client'),
      this.createTableIfNotExists('order'),
      this.createTableIfNotExists('product'),
    ]).then(() => this.executeScripts())

  }

  async getItem<T = any>(tableName: string, key: Record<string, any>): Promise<T | undefined> {
    const result = await this.client.send(new GetCommand({ TableName: tableName, Key: key }));
    return result.Item as T | undefined;
  }

  async putItem(tableName: string, item: Record<string, any>): Promise<void> {
    await this.client.send(new PutCommand({ TableName: tableName, Item: item }));
  }

  async deleteItem(tableName: string, key: Record<string, any>): Promise<void> {
    await this.client.send(new DeleteCommand({ TableName: tableName, Key: key }));
  }

  async scanByField<T = any>(params: {
    tableName: string;
    filterExpression: string;
    expressionValues: Record<string, any>;
    expressionNames?: Record<string, string>;
  }): Promise<T[]> {
    const command = new ScanCommand({
      TableName: params.tableName,
      FilterExpression: params.filterExpression,
      ExpressionAttributeValues: params.expressionValues,
      ExpressionAttributeNames: params.expressionNames,
    });

    const result = await this.client.send(command);
    return result.Items as T[] || [];
  }

  async count(tableName: string): Promise<number | undefined> {
    const result = await this.client.send(
      new ScanCommand({
        TableName: tableName,
        Select: 'COUNT',
      })
    );
    return result.Count;
  }

  private async createTableIfNotExists(tableName: string): Promise<void> {
    if (!tableName) throw new Error('TableName é obrigatório');

    const input = {
      TableName: tableName,
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
      ],
      BillingMode: 'PAY_PER_REQUEST', // ou 'PROVISIONED' com Throughput
    }

    const existingTables = await this.ddbClient.send(new ListTablesCommand({}));
    const exists = existingTables.TableNames?.includes(tableName);

    if (exists) {
      console.log(`Tabela "${tableName}" já existe.`);
      return;
    }

    await this.ddbClient.send(new CreateTableCommand(input as CreateTableCommandInput));
    console.log(`Tabela "${tableName}" criada com sucesso.`);
  }

  private async executeScripts() {
    const products = [{
      id: 'cvxcvxvbxbx',
      name: "Big Mac Bacon",
      description: "Dois hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles, bacon e pão com gergelim",
      price: 18.90,
      category: "LANCHE"
    },
    {
      id: 'hgkjjfkhkfk',
      name: "Big Mac Duplo",
      description: "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergelim",
      price: 20.90,
      category: "LANCHE"
    },
    {
      id: 'lfgnmndfvbdsh',
      name: "McFritas Grande",
      description: "Deliciosas batatas selecionadas, fritas, crocantes por fora, macias por dentro, douradas, irresistíveis, saborosas, famosas, e todos os outros adjetivos positivos que você quiser dar",
      price: 14.50,
      category: "ACOMPANHAMENTO"
    },
    {
      id: 'efcbvnmlkhjfgh',
      name: "Chicken McNuggets",
      description: "Crocantes, leves e deliciosos. Os frangos empanados mais irresistíveis do McDonald’s agora na versão Mega, ideal para compartilhar. Composto por 15 unidades de Chicken McNuggets",
      price: 20.00,
      category: "ACOMPANHAMENTO"
    },
    {
      id: 'lçlçmdsdsvhvh',
      name: "Coca-Cola 300ml",
      description: "Bebida gelada na medida certa para matar sua sede. Refrescante Coca-Cola 300ml",
      price: 10.50,
      category: "BEBIDA"
    },
    {
      id: 'psdfvdnscbrr',
      name: "Sprite Sem Açúcar 500ml",
      description: "Bebida gelada na medida certa para matar sua sede. Refrescante Sprite Sem Açúcar 500ml",
      price: 15.00,
      category: "BEBIDA"
    },
    {
      id: 'ygvncmnmbasvc',
      name: "McShake Ovomaltine 400ml",
      description: "O novo McShake é feito com leite e batido na hora com o delicioso Ovomaltine",
      price: 15.00,
      category: "SOBREMESA"
    },
    {
      id: 'klfkdsnfvchdff',
      name: "McFlurry KitKat Triple Chocolate",
      description: "Sobremesa composta por bebida láctea sabor chocolate, cobertura sabor chocolate e tablete de KitKat Triple Chocolate",
      price: 15.90,
      category: "SOBREMESA"
    }];

    const count = await this.count('product');

    if (!count) {
      for (const p of products) {
        p.id = crypto.randomUUID();
        await this.putItem('product', p);
      }
      console.log('Produtos inseridos')
    }

  }
}
