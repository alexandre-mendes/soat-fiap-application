import { HttpServerResponse } from "../../interface-adapter/controller/http/IHttpServer";
import { DiConfig } from "./DiConfig";

export class HttpServerConfig {

    constructor(di: DiConfig) {

        //Cliente
        di.httpServer.register('/clients', 'POST', di.clientController.create.bind(di.clientController));
        di.httpServer.register('/clients/:cpf', 'GET', di.clientController.findByCpf.bind(di.clientController));

        //Produto
        di.httpServer.register('/products', 'POST', di.productController.create.bind(di.productController));
        di.httpServer.register('/products/:id', 'PUT', di.productController.update.bind(di.productController));
        di.httpServer.register('/products/:id', 'DELETE', di.productController.delete.bind(di.productController));
        di.httpServer.register('/products/category/:category', 'GET', di.productController.findAllByCategory.bind(di.productController));
        
        //Pedido
        di.httpServer.register('/orders/checkout', 'POST', di.orderController.checkout.bind(di.orderController));
        di.httpServer.register('/orders', 'GET', di.orderController.findAll.bind(di.orderController));
        di.httpServer.register('/orders/:id/progress', 'PUT', di.orderController.progress.bind(di.orderController));
        di.httpServer.register('/orders/:id/payment', 'PUT', di.orderController.payment.bind(di.orderController));
        di.httpServer.register('/orders/:id/payment-info', 'GET', di.orderController.paymentDetail.bind(di.orderController));

        //Health
        di.httpServer.register('/health', 'GET', async () => new HttpServerResponse({status: "UP"}, 200));

        di.httpServer.start();
    }
}