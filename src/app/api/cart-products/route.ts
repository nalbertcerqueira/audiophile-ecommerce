import { getCartItemsUseCase } from "@/@core/backend/main/factories/cart/getCartItemsFactory"
import { NextResponse } from "next/server"

export async function GET() {
    const cartItems = await getCartItemsUseCase.execute()

    return NextResponse.json({ data: cartItems }, { status: 200 })
}
