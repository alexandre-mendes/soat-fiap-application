

import dotenv from 'dotenv';
import { MongooseConfig } from './frameworks-and-drivers/config/MongooseConfig';
import { HttpServerConfig } from './frameworks-and-drivers/config/HttpServerConfig';
import { DiConfig } from './frameworks-and-drivers/config/DiConfig';

dotenv.config();
const di = new DiConfig()
new MongooseConfig()//.executeScripts();
new HttpServerConfig(di);