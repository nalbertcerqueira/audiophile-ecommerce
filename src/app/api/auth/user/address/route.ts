import { nextMiddlewareAdapter } from "@/@core/backend/main/adapters/nextMiddlewareAdapter"
import { nextRouteAdapter } from "@/@core/backend/main/adapters/nextRouteAdapter"
import { getAddressController } from "@/@core/backend/main/factories/controllers/address/getAddressControllerFactory"
import { authenticatedAuthMiddleware } from "@/@core/backend/main/factories/middlewares/authenticatedAuthMiddlewareFactory"

export const GET = nextMiddlewareAdapter(
    authenticatedAuthMiddleware,
    nextRouteAdapter(getAddressController)
)
