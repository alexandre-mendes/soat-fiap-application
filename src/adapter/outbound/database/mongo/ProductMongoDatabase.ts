import mongoose, { Schema } from "mongoose";
import { DBQuery, Filter, IDatabase } from "../IDatabase";

export interface IProduct extends Document {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

const productSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
});

export const Product = mongoose.model<IProduct>('Product', productSchema);

export class ProductMongoDatabase implements IDatabase<IProduct> {

    async save(entity: IProduct): Promise<IProduct> {
        const newProduct = new Product(entity);
        const saved = await newProduct.save();
        return saved as IProduct;
    }

    async update(entity: IProduct): Promise<IProduct> {
        const updated = await Product.findByIdAndUpdate(entity.id, entity, { new: true });
        return updated as IProduct;
    }

    async deleteById(id: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id))
            return;
        await Product.findByIdAndDelete(id);
    }

    async findById(id: string): Promise<IProduct | null> {
        if (!mongoose.Types.ObjectId.isValid(id))
            return null;
        return await Product.findById(id);
    }

    async findByQuery(query: DBQuery): Promise<IProduct> {
        const filter = new Filter();
        query.andCriteria.forEach(criteria => filter.addCriteria(criteria));
        return await Product.findOne(filter) as IProduct;
    }

    async findAllByQuery(query: DBQuery): Promise<IProduct[]> {
        const filter = new Filter();
        query.andCriteria.forEach(criteria => filter.addCriteria(criteria));
        return await Product.find(filter).exec() as IProduct[];
    }

}