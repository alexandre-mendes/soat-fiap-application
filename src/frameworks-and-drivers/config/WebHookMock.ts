import { MercadoPagoWebHook } from "../../interface-adapter/gateway/MercadoPagoImpl";
import { PaymentOrderUpdate } from "../../use-cases/input/order/PaymentOrderUpdate";

export class WebHookMock implements MercadoPagoWebHook {
    
    constructor(private paymentOrderUpdate: PaymentOrderUpdate) {}
    
    async execute(id: string, value: number): Promise<void> {
        if (value > 200)
            return;

        this.paymentOrderUpdate.execute(id, true);
    }
}