import clientRepository from "../../../infra/repositories/client";
import { ClientService } from "./ClientService";

const clientService = new ClientService(clientRepository);

export default clientService;