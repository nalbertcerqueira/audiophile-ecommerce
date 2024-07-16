import { DbAddCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbAddCartItemUseCase"
import { ZodCartItemValidator } from "@/@core/backend/infra/services/validators/cart/zodCartItemValidator"
import { AddCartItemController } from "@/@core/backend/presentation/controllers/cart/addCartItemController"
import { mongoProductRepository } from "../../repositories/productRepositoryFactory"
import { createMongoCartRepository } from "../../repositories/cartRepositoryFactory"

function createAddCartItemController() {
    const zodCartItemValidator = new ZodCartItemValidator()
    const mongoCartRepository = createMongoCartRepository()

    const dbAddCartItemUseCase = new DbAddCartItemUseCase(
        mongoProductRepository,
        mongoCartRepository
    )

    return new AddCartItemController(zodCartItemValidator, dbAddCartItemUseCase)
}

export const addCartItemController = createAddCartItemController()
