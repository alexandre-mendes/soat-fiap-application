
export interface IMercadoPagpGataway {
    pay(orderId: string, callback: Function): Promise<void>
}