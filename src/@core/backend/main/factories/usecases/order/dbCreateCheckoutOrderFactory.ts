import { DbCreateCheckoutOrderUseCase } from "@/@core/backend/domain/usecases/order/dbCreateCheckoutOrderUseCase"
import { createMongoCheckoutOrderRepository } from "../../repositories/checkoutOrderRepositoryFactory"
import { createMongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { ClientSession } from "mongodb"

export function createDbCreateCheckoutOrderUseCase(
    session?: ClientSession
): DbCreateCheckoutOrderUseCase {
    const mongoCartRepository = createMongoCartRepository(session)
    const mongoCheckoutOrderRepository = createMongoCheckoutOrderRepository(session)

    return new DbCreateCheckoutOrderUseCase(
        mongoCartRepository,
        mongoCartRepository,
        mongoCheckoutOrderRepository
    )
}

export const dbCreateCheckoutOrderUseCase = createDbCreateCheckoutOrderUseCase()
