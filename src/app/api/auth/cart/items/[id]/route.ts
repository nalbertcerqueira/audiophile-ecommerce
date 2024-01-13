import { dbRemoveCartItemUseCase } from "@/@core/backend/main/factories/usecases/cart/dbRemoveCartItemFactory"
import { generateCustomZodErrors } from "@/@core/shared/entities/helpers"
import { Cart } from "@/@core/shared/entities/cart/cart"
import { NextRequest, NextResponse } from "next/server"
import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const authorization = req.headers.get("authorization") as string
    const body = await req.json()

    const validationResult = Cart.itemSchema.pick({ quantity: true }).safeParse(body)

    try {
        if (!validationResult.success) {
            const errors = generateCustomZodErrors(validationResult.error, 1)
            return NextResponse.json({ errors }, { status: 400 })
        }

        const authResponse = await authorizationMiddleware.handle({
            headers: { authorization }
        })

        if (authResponse.statusCode !== 200) {
            const { statusCode, headers, ...responseRest } = authResponse
            return NextResponse.json(responseRest, { status: statusCode, headers })
        }

        const productId = params.id
        const quantity = body.quantity as number

        const cart = await dbRemoveCartItemUseCase.execute(
            { id: authResponse.data.id, type: authResponse.data.type },
            { productId, quantity }
        )

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
