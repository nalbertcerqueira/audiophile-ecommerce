import { MongoTransactionManager } from "@/@core/backend/infra/services/mongoTransactionManager"
import { TransactionManager } from "@/@core/backend/domain/services/transactionManager"
import { ClientSession } from "mongodb"

export function createMongoTransactionManager(session: ClientSession): TransactionManager {
    return new MongoTransactionManager(session)
}
