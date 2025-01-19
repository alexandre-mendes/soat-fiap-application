import orderService from "../../../application/driven/order";
import { OrderController } from "./OrderController";

const orderController = new OrderController(orderService);

export default orderController;