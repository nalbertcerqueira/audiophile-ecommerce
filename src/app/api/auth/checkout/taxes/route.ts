import { getOrderTaxesController } from "@/@core/backend/main/factories/controllers/order/getOrderTaxesControllerFactory"
import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"
import { nextMiddlewareAdapter } from "@/@core/backend/main/adapters/nextMiddlewareAdapter"
import { nextRouteAdapter } from "@/@core/backend/main/adapters/nextRouteAdapter"

export const GET = nextMiddlewareAdapter(
    authorizationMiddleware,
    nextRouteAdapter(getOrderTaxesController)
)
