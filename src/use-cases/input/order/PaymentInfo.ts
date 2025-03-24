export interface PaymentInfo {
    execute(orderId: string): Promise<PaymentInfoOutput>;
}

export interface PaymentInfoOutput {
    id: string,
    number: number,
    approved: boolean
}