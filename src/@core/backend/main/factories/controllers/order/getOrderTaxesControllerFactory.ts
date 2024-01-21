import { GetOrderTaxesController } from "@/@core/backend/presentation/controllers/order/getOrderTaxesController"
import { dbGetOrderTaxesUseCase } from "../../usecases/order/dbGetOrderTaxesFactory"

function createGetOrderTaxesController() {
    return new GetOrderTaxesController(dbGetOrderTaxesUseCase)
}

export const getOrderTaxesController = createGetOrderTaxesController()
