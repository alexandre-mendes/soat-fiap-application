import { IProductRepository } from "../../../application/driver/products/IProductRepository";
import { CategoryType, Product } from "../../../domain/entity/Product";
import { DBCriteria, DBOperation, DBQuery, IDatabase } from "../../database/IDatabase";
import { IProduct } from "../../database/mongo/product/ProductMongoDatabase";

export class MongoProductRepoitory implements IProductRepository {

    constructor(private database: IDatabase<IProduct>) { }

    async findByNameAndCategory(name: string, category: string): Promise<Product|undefined> {
        const query = new DBQuery();
        query.add(new DBCriteria('name', name, DBOperation.EQUALS));
        query.add(new DBCriteria('category', category, DBOperation.EQUALS));
        const finded = await this.database.findByQuery(query);

        if (finded)
            return this.parseToEntity(finded);
        return undefined;
    }

    async save(product: Product): Promise<Product> {
        const db = this.parseToDB(product);
        const saved = await this.database.save(db);
        return this.parseToEntity(saved as IProduct);
    }

    async update(product: Product): Promise<Product> {
        const db = this.parseToDB(product);
        const updated = await this.database.update(db);
        return this.parseToEntity(updated as IProduct);
    }

    async findAllByCategory(category: string): Promise<Product[]> {
        const query = new DBQuery();
        query.add(new DBCriteria('category', category, DBOperation.EQUALS));
        const products = await this.database.findAllByQuery(query);
        return products.map(this.parseToEntity);
    }

    async deleteById(id: string): Promise<void> {
        await this.database.deleteById(id);
    }

    async findById(id: string): Promise<Product | null> {
        const product = await this.database.findById(id);

        if (!product)
            return null;

        return this.parseToEntity(product);
    }

    private parseToDB(entity: Product) {
        return { id: entity.id, name: entity.name, description: entity.description, price: entity.price, category: entity.category as string } as IProduct;
    }

    private parseToEntity(db: IProduct): Product {
        const entity = new Product(db.name, db.description, db.price, db.category as CategoryType);
        entity.id = db.id;
        return entity;
    }
}