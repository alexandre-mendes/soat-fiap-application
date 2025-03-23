import { CategoryType, Product } from "../../entities/Product";
import { DBCriteria, DBOperation, DBQuery, IDatabase } from "./IDatabase";
import { IProduct } from "../../frameworks-and-drivers/database/mongo/ProductMongoDatabase";
import { DeleteProduct } from "../../use-cases/output/product/DeleteProduct";
import { FindProduct } from "../../use-cases/output/product/FindProduct";
import { SaveProduct } from "../../use-cases/output/product/SaveProduct";

export class DeleteProductImpl implements DeleteProduct {

    constructor(private database: IDatabase<IProduct>) { }

    async deleteById(id: string): Promise<void> {
        await this.database.deleteById(id);
    }
}

export class FindProductImpl implements FindProduct {

    constructor(private database: IDatabase<IProduct>) { }

    async findAllByCategory(category: CategoryType): Promise<Product[]> {
        const query = new DBQuery();
        query.add(new DBCriteria('category', category, DBOperation.EQUALS));
        const products = await this.database.findAllByQuery(query);
        return products.map(parseToEntity);
    }

    async findByNameAndCategory(name: string, category: string): Promise<Product|undefined> {
        const query = new DBQuery();
        query.add(new DBCriteria('name', name, DBOperation.EQUALS));
        query.add(new DBCriteria('category', category, DBOperation.EQUALS));
        const finded = await this.database.findByQuery(query);

        if (finded)
            return parseToEntity(finded);
        return undefined;
    }

    async findById(productId: string): Promise<Product|undefined> {
        const product = await this.database.findById(productId);

        if (!product)
            return undefined;

        return parseToEntity(product);
    }
    
}

export class SaveProductImpl implements SaveProduct {

    constructor(private database: IDatabase<IProduct>) { }

    async save(product: Product): Promise<Product> {
        const db = parseToDB(product);
        let saved = null;

        if (db.id)
            saved = await this.database.update(db);
        else
            saved = await this.database.save(db);

        return parseToEntity(saved as IProduct);
    }
    
}

function parseToDB(entity: Product) {
    return { id: entity.id, name: entity.name, description: entity.description, price: entity.price, category: entity.category as string } as IProduct;
}

function parseToEntity(db: IProduct): Product {
    const entity = new Product(db.name, db.description, db.price, db.category as CategoryType);
    entity.id = db.id;
    return entity;
}