import { ProductType } from "@/@core/backend/domain/repositories/product/protocols"
import { dbGetProductsUseCase } from "@/@core/backend/main/factories/usecases/product/dbGetProductsFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const productType = req.nextUrl.searchParams.get("type") as ProductType

    const products = await dbGetProductsUseCase.execute(productType)

    return NextResponse.json({ data: products }, { status: 200 })
}
