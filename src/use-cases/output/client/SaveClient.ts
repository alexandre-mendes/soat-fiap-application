import { Client } from "../../../entities/Client";


export interface SaveClient {

    save(client: Client): Promise<Client>;

}