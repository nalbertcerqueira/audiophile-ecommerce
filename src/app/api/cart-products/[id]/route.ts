import { getCartItemByIdUseCase } from "@/@core/backend/main/factories/usecases/cart/getCartItemByIdFactory"
import { NextRequest, NextResponse } from "next/server"

interface Params {
    id: string
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    const itemId = params.id
    const cartItem = await getCartItemByIdUseCase.execute(itemId)

    if (!cartItem) {
        return NextResponse.json(
            { errors: [`product with id: '${itemId}' not found`] },
            { status: 404 }
        )
    }

    return NextResponse.json({ data: cartItem }, { status: 200 })
}
