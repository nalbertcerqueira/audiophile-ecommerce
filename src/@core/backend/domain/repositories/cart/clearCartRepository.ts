export interface ClearCartRepository {
    clearCartById(userId: string): Promise<void>
}
