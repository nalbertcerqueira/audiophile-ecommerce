import { DbUpdateCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbUpdateCartItemUseCase"
import { createMongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { UpdateCartItemController } from "@/@core/backend/presentation/controllers/cart/updateCartItemController"
import { ZodCartItemQuantityValidator } from "@/@core/backend/infra/services/validators/cart/zodCartItemQuantityValidator"

function createUpdateCartItemController() {
    const mongoCartRepository = createMongoCartRepository()
    const zodItemQuantityValidator = new ZodCartItemQuantityValidator()

    const dbUpdateCartItemUseCase = new DbUpdateCartItemUseCase(
        mongoCartRepository,
        mongoCartRepository
    )

    return new UpdateCartItemController(zodItemQuantityValidator, dbUpdateCartItemUseCase)
}

export const updateCartItemController = createUpdateCartItemController()
