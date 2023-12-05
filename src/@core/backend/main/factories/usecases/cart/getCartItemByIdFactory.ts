import { GetCartItemsByIdUseCase } from "@/@core/backend/domain/usecases/cart/getCartItemByIdUseCase"
import { MongoCartItemRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartItemRepository"

function createGetCartItemByIdUseCase() {
    const mongoCartItemsRepository = new MongoCartItemRepository()
    const getCartItemByIdUseCase = new GetCartItemsByIdUseCase(mongoCartItemsRepository)
    return getCartItemByIdUseCase
}

export const getCartItemByIdUseCase = createGetCartItemByIdUseCase()
