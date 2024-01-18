import { GetCartController } from "@/@core/backend/presentation/controllers/cart/getCartController"
import { dbGetCartUseCase } from "../../usecases/cart/dbGetCartFactory"

function createGetCartController() {
    return new GetCartController(dbGetCartUseCase)
}

export const getCartController = createGetCartController()
