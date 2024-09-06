import { nextRouteAdapter } from "@/@core/backend/main/adapters/nextRouteAdapter"
import { signinController } from "@/@core/backend/main/factories/controllers/signin/signinControllerFactory"

export const POST = nextRouteAdapter(signinController)
