
import clientController from "./infra/controller/client";
import { HttpServerConfig } from "./infra/controller/HttpServerConfig";
import orderController from "./infra/controller/order";
import productController from "./infra/controller/product";
import { MongooseConfig } from "./infra/database/mongo/MongooseConfig";
import httpServer from "./infra/http";
import dotenv from 'dotenv';

dotenv.config();
new MongooseConfig().executeScripts();
new HttpServerConfig(httpServer, clientController, productController, orderController);