import { DbAddProductsToCartUseCase } from "@/@core/backend/domain/usecases/cart/dbAddProductsToCartUseCase"
import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"

function createDbAddProductsToCartUseCase() {
    return new DbAddProductsToCartUseCase(mongoCartRepository)
}

export const dbAddProductsToCartUseCase = createDbAddProductsToCartUseCase()
