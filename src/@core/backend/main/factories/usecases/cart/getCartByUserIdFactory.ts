import { GetCartByUserIdUseCase } from "@/@core/backend/domain/usecases/cart/getCartByUserIdUseCase"
import { MongoCartRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartRepository"

export function createGetCartByUserIdUseCase() {
    const mongoCartRepository = new MongoCartRepository()
    const getCartByUserIdUseCase = new GetCartByUserIdUseCase(mongoCartRepository)

    return getCartByUserIdUseCase
}

export const getCartByUserIdUseCase = createGetCartByUserIdUseCase()
