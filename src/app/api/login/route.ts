import { generateCustomZodErrors } from "@/@core/shared/entities/helpers"
import { dbSigninUseCase } from "@/@core/backend/main/factories/usecases/auth/authenticatedUser/dbSigninFactory"
import { User } from "@/@core/shared/entities/user/user"
import { NextRequest, NextResponse } from "next/server"
import { dbGuestAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/guestUser/dbGuestAuthorizationFactory"
import { mongoCartRepository } from "@/@core/backend/main/factories/repositories/cartRepositoryFactory"
import { authenticatedJwtTokenService } from "@/@core/backend/main/factories/services/tokenServiceFactory"
import { dbAddProductsToCartUseCase } from "@/@core/backend/main/factories/usecases/cart/dbAddProductsToCartFactory"
import { dbClearCartUseCase } from "@/@core/backend/main/factories/usecases/cart/dbClearCartFactory"

const loginValidator = User.userSchema.pick({ email: true, password: true })

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()
    const validationResult = loginValidator.safeParse({ email, password })
    const sessionToken = req.headers.get("authorization")?.split(" ")[1] as string

    try {
        if (!validationResult.success) {
            const errors = generateCustomZodErrors(validationResult.error, 1)
            return NextResponse.json({ errors }, { status: 400 })
        }

        const token = await dbSigninUseCase.execute(validationResult.data)

        if (token) {
            const payload = authenticatedJwtTokenService.decode(token)
            const guestUser = await dbGuestAuthorizationUseCase.execute(sessionToken)

            if (payload && guestUser) {
                const guestCart = await mongoCartRepository.getCartById(guestUser.id, "guest")

                if (guestCart) {
                    const { id, sessionType } = payload
                    const { items } = guestCart.toJSON()

                    await dbAddProductsToCartUseCase.execute({ id, type: sessionType }, items)
                    await dbClearCartUseCase.execute(guestUser.id, "guest")
                }
            }

            return NextResponse.json({ data: token }, { status: 200 })
        }

        const unauthorizedHeaders = { "WWW-Authenticate": 'Bearer realm="protected resource"' }
        return NextResponse.json(
            { errors: ["Invalid email or password"] },
            { status: 401, headers: unauthorizedHeaders }
        )
    } catch (error: any) {
        return NextResponse.json({ errors: [error.message] }, { status: 500 })
    }
}
