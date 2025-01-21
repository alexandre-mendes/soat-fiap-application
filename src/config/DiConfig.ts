import { ClientService } from "../core/service/ClientService";
import { ProductService } from "../core/service/ProductService";

import { ClientMongoDatabase } from "../adapter/outbound/database/mongo/ClientMongoDatabase";
import { MongoClientRepository } from "../adapter/outbound/repositories/MongoClientRepository";
import { ProductMongoDatabase } from "../adapter/outbound/database/mongo/ProductMongoDatabase";
import { MongoProductRepository } from "../adapter/outbound/repositories/MongoProductRepository";
import { OrderMongoDatabase } from "../adapter/outbound/database/mongo/OrderMongoDatabase";
import { MongoOrderRepository } from "../adapter/outbound/repositories/MongoOrderRepository";
import { OrderService } from "../core/service/OrderService";
import { MercadoPagoGateway } from "../adapter/outbound/gateway/MercadoPagoGateway";
import { ClientController } from "../adapter/inbound/controller/ClientController";
import { OrderController } from "../adapter/inbound/controller/OrderController";
import { ProductController } from "../adapter/inbound/controller/ProductController";
import { ExpressHttpServer } from "../adapter/inbound/http/ExpressHttpServer";

export class DiConfig {
    //Database
    public clientDatabase = new ClientMongoDatabase();
    public productDatabase = new ProductMongoDatabase();
    public orderDatabase = new OrderMongoDatabase();

    //Repository
    public clientRepository = new MongoClientRepository(this.clientDatabase);
    public productRepository = new MongoProductRepository(this.productDatabase);
    public orderRepository = new MongoOrderRepository(this.orderDatabase);

    //Gateway
    public mercadoPagoGateway = new MercadoPagoGateway();

    //HTTP Server
    public httpServer = new ExpressHttpServer();

    //Service
    public clientService = new ClientService(this.clientRepository);
    public productService = new ProductService(this.productRepository);
    public orderService = new OrderService(this.orderRepository, this.clientRepository, this.productRepository, this.mercadoPagoGateway);

    //Controller
    public clientController = new ClientController(this.clientService);
    public productController = new ProductController(this.productService);
    public orderController = new OrderController(this.orderService);
}