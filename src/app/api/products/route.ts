import { ProductType } from "@/@core/backend/domain/repositories/product/getProductsRepository"
import { getDbProductsUseCase } from "@/@core/backend/main/factories/usecases/product/dbGetProductsFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const productType = req.nextUrl.searchParams.get("type") as ProductType

    const products = await getDbProductsUseCase.execute(productType)

    return NextResponse.json({ data: products }, { status: 200 })
}
