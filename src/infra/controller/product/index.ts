import productService from "../../../application/driven/product";
import { ProductController } from "./ProductController";

const productController = new ProductController(productService);

export default productController;