import { MercadoPago } from "../../use-cases/output/mercado-pago/MercadoPago";

export interface MercadoPagoWebHook {
    execute(id: string, value: number): Promise<void>;
}

export class MercadoPagoImpl implements MercadoPago {

    constructor(private webHook: MercadoPagoWebHook) { }

    async generateQrCode(id: string, value: number): Promise<void> {
        console.log(`Generate Qr Code [ orderId = ${id}, value = ${value} ]`);
        await this.webHook.execute(id, value);
    }
}