import productRepository from "../../../infra/repositories/product";
import { ProductService } from "./ProductService";

const productService = new ProductService(productRepository);

export default productService;