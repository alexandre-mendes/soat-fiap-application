import orderMongoDatabase from "../../database/mongo/order";
import { MongoOrderRepository } from "./MongoOrderRepository";

const orderRepository = new MongoOrderRepository(orderMongoDatabase);

export default orderRepository;