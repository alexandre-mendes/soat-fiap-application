import { DomainError } from "../../entities/error/DomainError";
import { HttpServerRequest, HttpServerResponse, IHttpServer } from "../../interface-adapter/controller/http/IHttpServer";
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";

export class ExpressHttpServer implements IHttpServer {

    private app: any;
    private port: any;

    constructor() {
        const port = process.env.SERVER_PORT || 3000
        this.app = express();
        this.app.use(cors())
        this.app.use(express.json())
        this.port = port;
    }

    register<REQ, RES>(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', callback: (request: HttpServerRequest<REQ>) => Promise<HttpServerResponse<RES>>): void {

        this.app[method.toLocaleLowerCase()](path, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const response = await callback({ body: req.body, headers: req.headers, params: req.params });
                res.status(response.status).json(response.body);
            }
            catch (err) {
                next(err);
            }
        });
    }

    start(): void {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);

            if (err instanceof DomainError) {
                res.status(400).json({ message: err.message });
                return;
            }

            res.status(500).send({ message: 'Ocorreu um erro inesperado.' });
        });

        // Carregar o arquivo YAML do Swagger
        const swaggerDocument = YAML.load('./swagger.yaml');

        // Configurar o Swagger UI para usar o arquivo YAML
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

        this.app.listen(this.port, () => {
            console.log(`Servidor rodando em http://localhost:${this.port}`);
            console.log(`Swagger disponível em http://localhost:${this.port}/api-docs`);
        });
    }
}