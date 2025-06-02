

import dotenv from 'dotenv';
import { HttpServerConfig } from './frameworks-and-drivers/config/HttpServerConfig';
import { DiConfig } from './frameworks-and-drivers/config/DiConfig';

dotenv.config();
const di = new DiConfig();
new HttpServerConfig(di);