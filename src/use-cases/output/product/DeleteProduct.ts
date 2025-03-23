export interface DeleteProduct {
    deleteById(id: string): Promise<void>;

}