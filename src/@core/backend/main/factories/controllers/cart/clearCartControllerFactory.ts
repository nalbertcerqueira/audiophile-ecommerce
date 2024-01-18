import { ClearCartController } from "@/@core/backend/presentation/controllers/cart/clearCartController"
import { dbClearCartUseCase } from "../../usecases/cart/dbClearCartFactory"

function createClearCartController() {
    return new ClearCartController(dbClearCartUseCase)
}

export const clearCartController = createClearCartController()
