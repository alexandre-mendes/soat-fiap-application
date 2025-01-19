import { Price } from "../vo/Price";
import { Client } from "./Client";
import { Product } from "./Product";
import { DomainError } from "../error/DomainError";

export enum Status {
    RECEIVED = 'RECEBIDO',
    IN_PREPARATION = 'EM PREPARAÇÃO',
    READY = 'PRONTO',
    FINALIZED = 'FINALIZADO'
}


export class Order {

    private _id: string | undefined;
    private _number: number;
    private _client: Client | undefined;
    private _items: OrderItem[];
    private _total: Price;
    private _paymentPending: boolean;
    private _status: Status | undefined;
    private _createdAt: Date;

    constructor(client: Client | undefined, items: OrderItem[]) {
        if (!items)
            throw new DomainError('O pedido não pode ser finalizado sem itens.');

        this._number = Order.generateOrderNumber();
        this._client = client;
        this._items = items;
        this._total = new Price(items.map(i => i.product.price * i.quantity).reduce((acumulator, currentValue) => {
            return acumulator + currentValue;
        }, 0));
        this._paymentPending = true;
        this._createdAt = new Date();
    }

    private static generateOrderNumber(): number {
        const timestamp = Date.now();
        const numeroCompacto = timestamp % 1000000000;

        return numeroCompacto;
    }

    public paymentApproved() {
        this._paymentPending = false;
        this._status = Status.RECEIVED;
    }

    public progress() {
        if (this._status === Status.RECEIVED)
            this._status = Status.IN_PREPARATION;
        else if (this._status === Status.IN_PREPARATION)
            this._status = Status.READY;
        else if (this._status === Status.READY)
            this._status = Status.FINALIZED;
    }

    get id() {
        return this._id;
    }

    set id(id: string | undefined) {
        this._id = id;
    }

    get number() {
        return this._number;
    }

    get waitingTime() {
        const diffMs: number = new Date().getTime() - this._createdAt.getTime();

        // Calcular os componentes de tempo
        const dias: number = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const horas: number = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos: number = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const segundos: number = Math.floor((diffMs % (1000 * 60)) / 1000);

        // Inicializar uma lista para armazenar as partes relevantes da string
        const partes: string[] = [];

        // Adicionar as partes de tempo à lista, apenas se forem maiores que zero
        if (dias > 0) partes.push(`${dias} dias`);
        if (horas > 0) partes.push(`${horas} horas`);
        if (minutos > 0) partes.push(`${minutos} minutos`);
        if (segundos > 0 || partes.length === 0) partes.push(`${segundos} segundos`); // Garante que "segundos" seja mostrado mesmo que a diferença seja menor que um minuto

        // Retornar a string concatenada
        return partes.join(', ');
    }

    set number(value: number) {
        this._number = value;
    }

    get client() {
        return this._client;
    }

    get items() {
        return this._items;
    }

    get total() {
        return this._total.value;
    }

    get paymentPending() {
        return this._paymentPending;
    }

    set paymentPending(value: boolean) {
        this._paymentPending = value;
    }

    get status() {
        return this._status;
    }

    set status(status: Status | undefined) {
        this._status = status;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }
}

export class OrderItem {
    private _product: Product;
    private _quantity: number;
    private _observation: string;

    constructor(product: Product, quantity: number, observation: string) {
        if (!product || !product.id)
            throw new DomainError('Informe um produto válido.');

        if (!quantity || quantity < 0)
            throw new DomainError(`Informe uma quantidade válida para o produto ${product.name}.`);

        this._product = product;
        this._quantity = quantity;
        this._observation = observation;
    }

    get product() {
        return this._product;
    }

    get quantity() {
        return this._quantity;
    }

    get observation() {
        return this._observation;
    }
}