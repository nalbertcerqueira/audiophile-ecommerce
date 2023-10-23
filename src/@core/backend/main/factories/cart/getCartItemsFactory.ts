import { GetCartItemsUseCase } from "@/@core/backend/domain/usecases/cart/getCartItemsUseCase"
import { MongoCartItemRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartItemRepository"

export function createGetCartItemsUseCase() {
    const mongoCartItemsRepository = new MongoCartItemRepository()
    const getCartItemsUseCase = new GetCartItemsUseCase(mongoCartItemsRepository)
    return getCartItemsUseCase
}
