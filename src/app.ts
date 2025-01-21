

import dotenv from 'dotenv';
import { MongooseConfig } from './config/MongooseConfig';
import { HttpServerConfig } from './config/HttpServerConfig';
import { DiConfig } from './config/DiConfig';

dotenv.config();
const di = new DiConfig()
new MongooseConfig().executeScripts();
new HttpServerConfig(di);