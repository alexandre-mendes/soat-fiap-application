
export interface IMercadoPagoGateway {
    pay(orderId: string, callback: Function): Promise<void>
}