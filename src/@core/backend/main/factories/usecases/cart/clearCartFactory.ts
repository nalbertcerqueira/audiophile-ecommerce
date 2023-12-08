import { ClearCartUseCase } from "@/@core/backend/domain/usecases/cart/clearCartUseCase"
import { MongoCartRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartRepository"

function createClearCartUseCase() {
    const mongoCartRepository = new MongoCartRepository()
    const clearCartUseCase = new ClearCartUseCase(mongoCartRepository)

    return clearCartUseCase
}

export const clearCartUseCase = createClearCartUseCase()
