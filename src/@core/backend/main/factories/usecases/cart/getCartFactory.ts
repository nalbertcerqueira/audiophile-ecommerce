import { GetCartUseCase } from "@/@core/backend/domain/usecases/cart/getCartUseCase"
import { MongoCartRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartRepository"

export function createGetCartUseCase() {
    const mongoCartRepository = new MongoCartRepository()
    const getCartUseCase = new GetCartUseCase(mongoCartRepository)

    return getCartUseCase
}

export const getCartUseCase = createGetCartUseCase()
