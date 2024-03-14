import { DbRemoveCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbRemoveCartItemUseCase"
import { RemoveCartItemController } from "@/@core/backend/presentation/controllers/cart/removeCartItemController"
import { mongoProductRepository } from "../../repositories/productRepositoryFactory"
import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { ZodCartItemQuantityValidator } from "@/@core/backend/infra/services/validators/cart/zodCartItemQuantityValidator"

function createRemoveCartItemController() {
    const zodQuantityValidator = new ZodCartItemQuantityValidator()
    const dbRemoveCartItemUseCase = new DbRemoveCartItemUseCase(
        mongoProductRepository,
        mongoCartRepository,
        mongoCartRepository
    )

    return new RemoveCartItemController(dbRemoveCartItemUseCase, zodQuantityValidator)
}

export const removeCartItemController = createRemoveCartItemController()
