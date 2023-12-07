import { generateCustomZodErrors } from "@/@core/backend/infra/validators/zod/zod-helpers"
import { cartItemZodSchema } from "@/@core/shared/entities/cart/util"
import { NextRequest, NextResponse } from "next/server"
import { authorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/authorizationFactory"
import { addCartItemUseCase } from "@/@core/backend/main/factories/usecases/cart/addCartItemFactory"
import { CartItemInfo } from "@/@core/backend/domain/usecases/cart/addCartItemUseCase"

export async function POST(req: NextRequest) {
    const accessToken = req.headers.get("authorization")?.split(" ")[1]
    const itemInfo = (await req.json()) as CartItemInfo
    const validationResult = cartItemZodSchema
        .pick({ productId: true, quantity: true })
        .safeParse(itemInfo)

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
        const cart = await addCartItemUseCase.execute(id, itemInfo)

        if (!cart) {
            return NextResponse.json(
                {
                    errors: [`Product with id '${itemInfo.productId}' not found`]
                },
                { status: 404 }
            )
        }

        return NextResponse.json({ teste: cart.toJSON() }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ errors: [error.message] }, { status: 500 })
    }
}
