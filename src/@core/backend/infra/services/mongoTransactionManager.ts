import { ClientSession } from "mongodb"
import { TransactionManager } from "../../domain/services/transactionManager"

export class MongoTransactionManager implements TransactionManager {
    constructor(private readonly session: ClientSession) {}

    public startTransaction(): void {
        this.session.startTransaction()
    }

    public async commit(): Promise<void> {
        await this.session.commitTransaction()
    }

    public async rollback(): Promise<void> {
        await this.session.abortTransaction()
    }
}
