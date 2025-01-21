import { Client } from "../../../core/model/entity/Client";
import { IClientRepository } from "../../../core/port/IClientRepository";
import { DBCriteria, DBOperation, DBQuery, IDatabase } from "../database/IDatabase";
import { IClient } from "../database/mongo/ClientMongoDatabase";

export class MongoClientRepository implements IClientRepository {
    
    constructor(private database: IDatabase<IClient>) { }

    async save(client: Client): Promise<Client> {
        const db = this.parseToDB(client);
        const saved = await this.database.save(db);
        return this.parseToEntity(saved as IClient);
    }

    async findByCpf(cpf: String): Promise<Client | undefined> {
        const query = new DBQuery();
        query.add(new DBCriteria('cpf', cpf, DBOperation.EQUALS));
        const finded = await this.database.findByQuery(query);

        if (finded)
            return this.parseToEntity(finded);
        return undefined;
    }

    async findById(id: string): Promise<Client | undefined> {
        const client = await this.database.findById(id);

        if (client)
            return this.parseToEntity(client);
        return undefined;
    }

    private parseToDB(entity: Client) {
        return { id: entity.id, name: entity.name, email: entity.email, cpf: entity.cpf } as IClient;
    }

    private parseToEntity(db: IClient) {
        const entity = new Client(db.cpf, db.name, db.email);
        entity.id = db.id;
        return entity;
    }
}