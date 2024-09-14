import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"
import { addCartItemController } from "@/@core/backend/main/factories/controllers/cart/addCartItemControllerFactory"
import { clearCartController } from "@/@core/backend/main/factories/controllers/cart/clearCartControllerFactory"
import { nextMiddlewareAdapter } from "@/@core/backend/main/adapters/nextMiddlewareAdapter"
import { nextRouteAdapter } from "@/@core/backend/main/adapters/nextRouteAdapter"

export const POST = nextMiddlewareAdapter(
    authorizationMiddleware,
    nextRouteAdapter(addCartItemController)
)

export const DELETE = nextMiddlewareAdapter(
    authorizationMiddleware,
    nextRouteAdapter(clearCartController)
)
