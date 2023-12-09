import { generateCustomZodErrors } from "@/@core/backend/infra/validators/zod/zod-helpers"
import { cartItemZodSchema } from "@/@core/shared/entities/cart/util"
import { NextRequest, NextResponse } from "next/server"
import { authorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/authorizationFactory"
import { dbAddCartItemUseCase } from "@/@core/backend/main/factories/usecases/cart/dbAddCartItemFactory"
import { CartItemInfo } from "@/@core/backend/domain/usecases/cart/protocols"

export async function POST(req: NextRequest) {
    const accessToken = req.headers.get("authorization")?.split(" ")[1]
    const body = (await req.json()) as CartItemInfo
    const validationResult = cartItemZodSchema
        .pick({ productId: true, quantity: true })
        .safeParse(body)

    try {
        if (!validationResult.success) {
            const errors = generateCustomZodErrors(validationResult.error, 1)
            return NextResponse.json({ errors }, { status: 400 })
        }

        if (!accessToken) {
            return NextResponse.json({ errors: ["Unauthorized"] }, { status: 401 })
        }

        const foundUser = await authorizationUseCase.execute(accessToken)
        if (!foundUser) {
            return NextResponse.json({ errors: ["Unauthorized"] }, { status: 401 })
        }

        const { id } = foundUser.toJSON()
        const { productId, quantity } = body
        const cart = await dbAddCartItemUseCase.execute(id, { productId, quantity })

        if (!cart) {
            return NextResponse.json(
                { errors: [`Product with id '${productId}' not found`] },
                { status: 404 }
            )
        }

        return NextResponse.json({ data: cart.toJSON() }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ errors: [error.message] }, { status: 500 })
    }
}
