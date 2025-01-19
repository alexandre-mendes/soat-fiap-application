import mercadoPagoGateway from "../../../infra/gateway/mercadopago";
import clientRepository from "../../../infra/repositories/client";
import orderRepository from "../../../infra/repositories/order";
import productRepository from "../../../infra/repositories/product";
import { OrderService } from "./OrderService";

const orderService = new OrderService(orderRepository, clientRepository, productRepository, mercadoPagoGateway);

export default orderService;