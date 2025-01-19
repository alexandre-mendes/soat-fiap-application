
import { IHttpServer } from "../http/IHttpServer";
import { ClientController } from "./client/ClientController";
import { OrderController } from "./order/OrderController";
import { ProductController } from "./product/ProductController";

export class HttpServerConfig {

    constructor(
        httpServer: IHttpServer, 
        clientController: ClientController, 
        productController: ProductController, 
        orderController: OrderController) {

        //Cliente
        httpServer.register('/clients', 'POST', clientController.create.bind(clientController));
        httpServer.register('/clients/:cpf', 'GET', clientController.findByCpf.bind(clientController));

        //Produto
        httpServer.register('/products', 'POST', productController.create.bind(productController));
        httpServer.register('/products/:id', 'PUT', productController.update.bind(productController));
        httpServer.register('/products/:id', 'DELETE', productController.delete.bind(productController));
        httpServer.register('/products/category/:category', 'GET', productController.findAllByCategory.bind(productController));
        
        //Pedido
        httpServer.register('/orders/checkout', 'POST', orderController.checkout.bind(orderController));
        httpServer.register('/orders', 'GET', orderController.findAll.bind(orderController));
        httpServer.register('/orders/:id/progress', 'PUT', orderController.progress.bind(orderController));

        httpServer.start();
    }
}