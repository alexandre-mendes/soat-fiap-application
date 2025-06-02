import { Client } from "../../entities/Client";
import { Order, OrderItem, Status } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { DBCriteria, DBOperation, DBQuery, IDatabase } from "./IDatabase";
import { IOrder } from "../../frameworks-and-drivers/database/mongo/OrderMongoDatabase";
import { FindOrder } from "../../use-cases/output/order/FindOrder";
import { SaveOrder } from "../../use-cases/output/order/SaveOrder";


export class FindOrderImpl implements FindOrder {

    constructor(private database: IDatabase<IOrder>) {

    }

    async findById(id: string): Promise<Order | undefined> {
        const order = await this.database.findById(id);

        if (order)
            return parseToEntity(order);
        return undefined;
    }

    async findAll(): Promise<Order[]> {
        const query = new DBQuery();
        query.add(new DBCriteria('paymentPending', false, DBOperation.EQUALS));
        query.add(new DBCriteria('status', 'FINALIZADO', DBOperation.NOT_EQUALS));
        query.orderBy('createdAt', 'asc');
        const orders = await this.database.findAllByQuery(query);
        return orders.map(parseToEntity);
    }

}

export class SaveOrderImpl implements SaveOrder {

    constructor(private database: IDatabase<IOrder>) {

    }

    async save(order: Order): Promise<Order> {
        const db = parseToDB(order);

        let saved = null;

        if (db.id)
            saved = await this.database.update(db);
        else
            saved = await this.database.save(db);

        return parseToEntity(saved as IOrder);
    }

}

function parseToDB(entity: Order): IOrder {
    return {
        id: entity.id,
        number: entity.number,
        client: {
            id: entity.client?.id as string,
            name: entity.client?.name as string,
            email: entity.client?.email as string,
            cpf: entity.client?.cpf as string,
        },
        items: entity.items.map(i => {
            return {
                product: {
                    id: i.product.id as string,
                    name: i.product.name,
                    description: i.product.description,
                    price: i.product.price,
                    category: i.product.category,
                },
                quantity: i.quantity,
                observation: i.observation,
            }
        }),
        total: entity.total,
        paymentPending: entity.paymentPending,
        status: entity.status,
        createdAt: entity.createdAt?.toISOString()
    } as IOrder;
}

function parseToEntity(db: IOrder): Order {
    let client = undefined;
    if (db?.client?.id) {
        client = new Client(db.client?.cpf as string, db.client?.name as string, db.client?.email as string);
        client.id = db.client?.id;

    }

    const items = db.items.map(i => {
        const product = new Product(i.product.name, i.product.description, i.product.price, i.product.category);
        product.id = i.product.id;
        return new OrderItem(product, i.quantity, i.observation);
    });

    const entity = new Order(client, items);
    entity.id = db.id;
    entity.createdAt = new Date(db.createdAt);
    entity.status = db.status as Status;
    entity.number = db.number;
    entity.paymentPending = db.paymentPending;
    return entity;
}