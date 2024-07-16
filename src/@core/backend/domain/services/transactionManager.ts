export interface TransactionManager {
    startTransaction(): void
    commit(): Promise<void>
    rollback(): Promise<void>
}
