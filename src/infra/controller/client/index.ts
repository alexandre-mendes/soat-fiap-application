import clientService from "../../../application/driven/client";
import { ClientController } from "./ClientController";

const clientController = new ClientController(clientService);

export default clientController;