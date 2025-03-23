import mongoose, { Schema } from "mongoose";
import { DBQuery, Filter, IDatabase } from "../../../interface-adapter/repositories/IDatabase";

export interface IOrder extends Document {
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
    createdAt: Date;
}

const orderSchema: Schema<IOrder> = new Schema({
    number: { type: Number, required: true },
    client: {
        id: { type: String, required: false },
        name: { type: String, required: false },
        email: { type: String, required: false },
        cpf: { type: String, required: false },
    },
    items: [{
        product: {
            id: { type: String, required: true },
            name: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            category: { type: String, required: true },
        },
        quantity: { type: Number, required: true },
        observation: { type: String, required: false },
    }],
    total: { type: Number, required: true },
    paymentPending: { type: Boolean, required: true },
    status: { type: String, required: false },
    createdAt: { type: Date, required: false },
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export class OrderMongoDatabase implements IDatabase<IOrder> {

    async save(entity: IOrder): Promise<IOrder> {
        const newOrder = new Order(entity);
        const saved = await newOrder.save();
        return saved as IOrder;
    }

    async update(entity: IOrder): Promise<IOrder> {
        const updated = await Order.findByIdAndUpdate(entity.id, entity, { new: true });
        return updated as IOrder;
    }

    async deleteById(id: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id))
            return;

        await Order.findByIdAndDelete(id);
    }

    async findById(id: string): Promise<IOrder | null> {
        if (!mongoose.Types.ObjectId.isValid(id))
            return null;
        return await Order.findById(id);
    }

    async findByQuery(query: DBQuery): Promise<IOrder> {
        const filter = new Filter();
        query.andCriteria.forEach(criteria => filter.addCriteria(criteria));
        return await Order.findOne(filter) as IOrder;
    }

    async findAllByQuery(query: DBQuery): Promise<IOrder[]> {
        const filter = new Filter();
        query.andCriteria.forEach(criteria => filter.addCriteria(criteria));
        return await Order.find(filter).sort(query.sort).exec() as IOrder[];
    }

}