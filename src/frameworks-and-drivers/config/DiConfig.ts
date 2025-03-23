
import { ClientMongoDatabase } from "../database/mongo/ClientMongoDatabase";
import { ProductMongoDatabase } from "../database/mongo/ProductMongoDatabase";
import { OrderMongoDatabase } from "../database/mongo/OrderMongoDatabase";
import { ClientController } from "../../interface-adapter/controller/ClientController";
import { OrderController } from "../../interface-adapter/controller/OrderController";
import { ProductController } from "../../interface-adapter/controller/ProductController";
import { ExpressHttpServer } from "../http/ExpressHttpServer";
import { FindClientImpl, SaveClientImpl } from "../../interface-adapter/repositories/MongoClientRepository";
import { DeleteProductImpl, FindProductImpl, SaveProductImpl } from "../../interface-adapter/repositories/MongoProductRepository";
import { FindOrderImpl, SaveOrderImpl } from "../../interface-adapter/repositories/MongoOrderRepository";
import { AddClientImpl } from "../../use-cases/AddClientImpl";
import { FindClientByCpfImpl } from "../../use-cases/FindClientByCpfImpl";
import { AddProductImpl } from "../../use-cases/AddProductImpl";
import { FindProductsByCategoryImpl } from "../../use-cases/FindProductsByCategoryImpl";
import { RemoveProductImpl } from "../../use-cases/RemoveProductImpl";
import { UpdateProductImpl } from "../../use-cases/UpdateProductImpl";
import { CheckoutOrderImpl } from "../../use-cases/CheckoutOrderImpl";
import { FindAllOrdersImpl } from "../../use-cases/FindAllOrders";
import { ProgressOrderImpl } from "../../use-cases/ProgressOrderImpl";
import { PaymentOrderUpdateImpl } from "../../use-cases/PaymentOrderUpdateImpl";
import { MercadoPagoImpl } from "../../interface-adapter/gateway/MercadoPagoImpl";
import { WebHookMock } from "./WebHookMock";

export class DiConfig {
    //Database
    public clientDatabase = new ClientMongoDatabase();
    public productDatabase = new ProductMongoDatabase();
    public orderDatabase = new OrderMongoDatabase();

    //Repository
    public findClient = new FindClientImpl(this.clientDatabase);
    public saveClient = new SaveClientImpl(this.clientDatabase);

    public deleteProduct = new DeleteProductImpl(this.productDatabase);
    public findProduct = new FindProductImpl(this.productDatabase);
    public saveProduct = new SaveProductImpl(this.productDatabase);

    public findOrder = new FindOrderImpl(this.orderDatabase);
    public saveOrder = new SaveOrderImpl(this.orderDatabase);


    //Use Cases
    public addClient = new AddClientImpl(this.findClient, this.saveClient);
    public findClientByCpf = new FindClientByCpfImpl(this.findClient);
    
    public addProduct = new AddProductImpl(this.findProduct, this.saveProduct);
    public findProductsByCategory = new FindProductsByCategoryImpl(this.findProduct);
    public removeProduct = new RemoveProductImpl(this.deleteProduct);
    public updateProduct = new UpdateProductImpl(this.findProduct, this.saveProduct);

    public findAllOrders = new FindAllOrdersImpl(this.findOrder);
    public progressOrder = new ProgressOrderImpl(this.findOrder, this.saveOrder);
    public paymentOrderUpdate = new PaymentOrderUpdateImpl(this.findOrder, this.saveOrder);
    public checkoutOrder = new CheckoutOrderImpl(this.findClient, this.findProduct, this.saveOrder, new MercadoPagoImpl(new WebHookMock(this.paymentOrderUpdate)));

    //HTTP Server
    public httpServer = new ExpressHttpServer();

    //Controller
    public clientController = new ClientController(this.addClient, this.findClientByCpf);
    public productController = new ProductController(this.addProduct, this.updateProduct, this.removeProduct, this.findProductsByCategory);
    public orderController = new OrderController(this.checkoutOrder, this.findAllOrders, this.progressOrder, this.paymentOrderUpdate);
}