
export interface IMercadoPagpGateway {
    pay(orderId: string, callback: Function): Promise<void>
}