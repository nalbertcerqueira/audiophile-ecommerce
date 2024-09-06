import { signupController } from "@/@core/backend/main/factories/controllers/signup/signupControllerFactory"
import { nextRouteAdapter } from "@/@core/backend/main/adapters/nextRouteAdapter"

export const POST = nextRouteAdapter(signupController)
