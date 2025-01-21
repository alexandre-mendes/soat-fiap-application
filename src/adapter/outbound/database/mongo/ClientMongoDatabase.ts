import { DBQuery, Filter, IDatabase } from "../IDatabase";

import mongoose, { Schema } from 'mongoose';

export interface IClient extends Document {
  id?: string,
  name: string;
  email: string;
  cpf: string;
}

const clientSchema: Schema<IClient> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
});

const Client = mongoose.model<IClient>('Client', clientSchema);

export class ClientMongoDatabase implements IDatabase<IClient> {

  async save(entity: IClient): Promise<IClient> {
    const newClient = new Client(entity);
    const saved = await newClient.save();
    return saved as IClient;
  }

  async update(entity: IClient): Promise<IClient> {
        const updated = await Client.findByIdAndUpdate(entity.id, entity, { new: true });
        return updated as IClient;
  }

  async deleteById(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id))
      return;

    await Client.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<IClient | null> {
    if (!mongoose.Types.ObjectId.isValid(id))
      return null;
    return await Client.findById(id);
  }

  async findByQuery(query: DBQuery): Promise<IClient> {
    const filter = new Filter();
    query.andCriteria.forEach(criteria => filter.addCriteria(criteria));
    return await Client.findOne(filter) as IClient;
  }

  async findAllByQuery(query: DBQuery): Promise<IClient[]> {
    const filter = new Filter();
    query.andCriteria.forEach(criteria => filter.addCriteria(criteria));
    return await Client.find(filter).sort(query.sort).exec() as IClient[];
  }
}