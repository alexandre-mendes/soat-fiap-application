import productMongoDatabase from "../../database/mongo/product";
import { MongoProductRepoitory } from "./MongoProductRepository";

const productRepository = new MongoProductRepoitory(productMongoDatabase);

export default productRepository;