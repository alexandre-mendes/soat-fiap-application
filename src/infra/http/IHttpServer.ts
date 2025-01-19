export interface IHttpServer {

    register<T, Y>(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', callback: (request: HttpServerRequest<T>) => Promise<HttpServerResponse<Y>>): void;
    start(): void;
}

export class HttpServerRequest<T> {
    readonly body: T;
    readonly params: any;
    readonly headers: any;

    constructor(body: T, headers: any, params: any) {
        this.body = body;
        this.headers = headers;
        this.params = params;
    }
}

export class HttpServerResponse<T> {
    readonly body: T;
    readonly status: number;

    constructor(body: T, status: number) {
        this.body = body;
        this.status = status;
    }
}