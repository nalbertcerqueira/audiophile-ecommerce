import { DbAddProductsToCartUseCase } from "@/@core/backend/domain/usecases/cart/dbAddProductsToCartUseCase"
import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"

function createDbAddProductsToCartUseCase(): DbAddProductsToCartUseCase {
    return new DbAddProductsToCartUseCase(mongoCartRepository)
}

export const dbAddProductsToCartUseCase = createDbAddProductsToCartUseCase()
