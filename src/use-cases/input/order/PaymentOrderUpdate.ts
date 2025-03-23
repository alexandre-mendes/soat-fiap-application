export interface PaymentOrderUpdate {

    execute(id: string, approved: boolean): Promise<void>;
}