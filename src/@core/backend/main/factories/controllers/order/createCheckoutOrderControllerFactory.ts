import { createMongoCheckoutOrderRepository } from "../../repositories/checkoutOrderRepositoryFactory"
import { CreateCheckoutOrderController } from "@/@core/backend/presentation/controllers/order/createCheckoutOrderController"
import { createMongoTransactionManager } from "../../services/transactionManagerFactory"
import { DbCreateCheckoutOrderUseCase } from "@/@core/backend/domain/usecases/order/dbCreateCheckoutOrderUseCase"
import { createMongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { ClientSession } from "mongodb"

export function createCheckoutOrderCreationController(
    session: ClientSession
): CreateCheckoutOrderController {
    const mongoCartRepository = createMongoCartRepository(session)
    const mongoTransactionManager = createMongoTransactionManager(session)
    const mongoCheckoutOrderRepository = createMongoCheckoutOrderRepository(session)

    const createCheckoutOrderUseCase = new DbCreateCheckoutOrderUseCase(
        mongoTransactionManager,
        mongoCartRepository,
        mongoCartRepository,
        mongoCheckoutOrderRepository
    )

    return new CreateCheckoutOrderController(createCheckoutOrderUseCase)
}
