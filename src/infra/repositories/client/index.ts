import clientMongoDatabase from "../../database/mongo/client";
import { MongoClientRepository } from "./MongoClientRepository";

const clientRepository = new MongoClientRepository(clientMongoDatabase);

export default clientRepository;