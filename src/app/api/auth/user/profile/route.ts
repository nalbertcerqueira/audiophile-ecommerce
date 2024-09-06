import { nextRouteAdapter } from "@/@core/backend/main/adapters/nextRouteAdapter"
import { guestSessionController } from "@/@core/backend/main/factories/controllers/session/guestSessionControllerFactory"
import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"
import { updateUserProfileController } from "@/@core/backend/main/factories/controllers/user/profile/updateUserProfileControllerFactory"
import { authenticatedAuthMiddleware } from "@/@core/backend/main/factories/middlewares/authenticatedAuthMiddlewareFactory"
import {
    guestNextMiddlewareAdapter,
    nextMiddlewareAdapter
} from "@/@core/backend/main/adapters/nextMiddlewareAdapter"

export const GET = guestNextMiddlewareAdapter(authorizationMiddleware, guestSessionController)

export const PUT = nextMiddlewareAdapter(
    authenticatedAuthMiddleware,
    nextRouteAdapter(updateUserProfileController)
)
