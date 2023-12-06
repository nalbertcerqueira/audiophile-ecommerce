import { ProductType } from "@/@core/backend/domain/repositories/product/getProductsRepository"
import { getProductsUseCase } from "@/@core/backend/main/factories/usecases/product/getProductsFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const productType = req.nextUrl.searchParams.get("type") as ProductType

    const products = await getProductsUseCase.execute(productType)

    return NextResponse.json({ data: products }, { status: 200 })
}
