import { dbGuestAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/dbGuestAuthorizationFactory"
import { generateCustomZodErrors } from "@/@core/shared/entities/helpers"
import { dbAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/dbAuthorizationFactory"
import { dbAddCartItemUseCase } from "@/@core/backend/main/factories/usecases/cart/dbAddCartItemFactory"
import { CartItemInfo } from "@/@core/backend/domain/usecases/cart/protocols"
import { Cart } from "@/@core/shared/entities/cart/cart"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const sessionToken = req.headers.get("authorization")?.split(" ")[1]
    const body = (await req.json()) as CartItemInfo
    const validationResult = Cart.itemSchema
        .pick({ productId: true, quantity: true })
        .safeParse(body)

    try {
        if (!validationResult.success) {
            const errors = generateCustomZodErrors(validationResult.error, 1)
            return NextResponse.json({ errors }, { status: 400 })
        }

        if (!sessionToken) {
            return NextResponse.json({ errors: ["Unauthorized"] }, { status: 401 })
        }

        const { productId, quantity } = body
        const [authenticatedUser, guestUser] = await Promise.allSettled([
            dbAuthorizationUseCase.execute(sessionToken),
            dbGuestAuthorizationUseCase.execute(sessionToken)
        ])

        if (authenticatedUser.status === "fulfilled" && authenticatedUser.value) {
            const { id } = authenticatedUser.value
            const cart = await dbAddCartItemUseCase.execute(
                { id, type: "authenticated" },
                { productId, quantity }
            )

            if (cart) {
                return NextResponse.json({ data: cart.toJSON() }, { status: 200 })
            }

            return NextResponse.json(
                { errors: [`Product with id '${productId}' not found`] },
                { status: 404 }
            )
        }

        if (guestUser.status === "fulfilled" && guestUser.value) {
            const { id } = guestUser.value
            const cart = await dbAddCartItemUseCase.execute(
                { id, type: "guest" },
                { productId, quantity }
            )

            if (cart) {
                return NextResponse.json({ data: cart.toJSON() }, { status: 200 })
            }

            return NextResponse.json(
                { errors: [`Product with id '${productId}' not found`] },
                { status: 404 }
            )
        }

        return NextResponse.json({ errors: ["Unauthorized"] }, { status: 401 })
    } catch (error: any) {
        return NextResponse.json({ errors: [error.message] }, { status: 500 })
    }
}
