import { generateCustomZodErrors } from "@/@core/backend/infra/validators/zod/zod-helpers"
import { authorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/authorizationFactory"
import { dbRemoveCartItemUseCase } from "@/@core/backend/main/factories/usecases/cart/dbRemoveCartItemFactory"
import { cartItemZodSchema } from "@/@core/shared/entities/cart/util"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const accessToken = req.headers.get("authorization")?.split(" ")[1]
    const body = await req.json()

    const validationResult = cartItemZodSchema.pick({ quantity: true }).safeParse(body)

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

        const { id: userId } = foundUser.toJSON()
        const productId = params.id
        const quantity = body.quantity as number

        const cart = await dbRemoveCartItemUseCase.execute(userId, { productId, quantity })

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
