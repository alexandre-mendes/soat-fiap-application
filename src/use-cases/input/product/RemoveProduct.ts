export interface RemoveProduct {
    execute(id: string): Promise<void>;
}