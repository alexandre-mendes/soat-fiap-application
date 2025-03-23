export interface MercadoPago {
    generateQrCode(id: string, value: number): Promise<void>;
}