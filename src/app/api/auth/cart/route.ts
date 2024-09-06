import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"
import { getCartController } from "@/@core/backend/main/factories/controllers/cart/getCartControllerFactory"
import { nextRouteAdapter } from "@/@core/backend/main/adapters/nextRouteAdapter"
import { nextMiddlewareAdapter } from "@/@core/backend/main/adapters/nextMiddlewareAdapter"

export const GET = nextMiddlewareAdapter(
    authorizationMiddleware,
    nextRouteAdapter(getCartController)
)
