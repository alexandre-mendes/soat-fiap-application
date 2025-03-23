import { Client } from "../../entities/Client";
import { DBCriteria, DBOperation, DBQuery, IDatabase } from "./IDatabase";
import { IClient } from "../../frameworks-and-drivers/database/mongo/ClientMongoDatabase";
import { FindClient } from "../../use-cases/output/client/FindClient";
import { SaveClient } from "../../use-cases/output/client/SaveClient";

export class FindClientImpl implements FindClient {

    constructor(private database: IDatabase<IClient>) { }

    async findByCpf(cpf: String): Promise<Client | undefined> {
        const query = new DBQuery();
        query.add(new DBCriteria('cpf', cpf, DBOperation.EQUALS));
        const finded = await this.database.findByQuery(query);

        if (finded)
            return parseToEntity(finded);
        return undefined;
    }

    async findById(id: string): Promise<Client | undefined> {
        const client = await this.database.findById(id);

        if (client)
            return parseToEntity(client);
        return undefined;
    }
}

export class SaveClientImpl implements SaveClient {

    constructor(private database: IDatabase<IClient>) { }

    async save(client: Client): Promise<Client> {
        const db = parseToDB(client);
        const saved = await this.database.save(db);
        return parseToEntity(saved as IClient);
    }
}

function parseToDB(entity: Client) {
    return { id: entity.id, name: entity.name, email: entity.email, cpf: entity.cpf } as IClient;
}

function parseToEntity(db: IClient) {
    const entity = new Client(db.cpf, db.name, db.email);
    entity.id = db.id;
    return entity;
}