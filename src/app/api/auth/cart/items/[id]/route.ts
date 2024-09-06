import { updateCartItemController } from "@/@core/backend/main/factories/controllers/cart/updateCartItemControllerFactory"
import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"
import { nextMiddlewareAdapter } from "@/@core/backend/main/adapters/nextMiddlewareAdapter"
import { nextRouteAdapter } from "@/@core/backend/main/adapters/nextRouteAdapter"

export const PATCH = nextMiddlewareAdapter(
    authorizationMiddleware,
    nextRouteAdapter(updateCartItemController)
)
