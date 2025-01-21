import { IMercadoPagpGateway as IMercadoPagoGateway } from "../../../application/driver/mercadopago/IMercadoPagoGateway";

export class MercadoPagoGateway implements IMercadoPagoGateway {

    public ordersPayments: { id: string, callback: Function }[] = []

    constructor() {
        setInterval(() => {
            const localList = [...this.ordersPayments];
            this.ordersPayments = [];
            localList.forEach(async o => {
                await o.callback(o.id)
                console.log(`Fake payment approved { orderId = ${o.id} }`)
            });
        }, 10000)
    }
    
    async pay(orderId: string, callback: Function): Promise<void> {
        this.ordersPayments.push({ id: orderId, callback });
        console.log(`Fake payment requested { orderId = ${orderId} }`);
    } 
}