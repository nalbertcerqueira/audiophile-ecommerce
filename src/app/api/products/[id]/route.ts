import { ProductType } from "@/@core/backend/domain/repositories/product/getProductsRepository"
import { getProductByIdUseCase } from "@/@core/backend/main/factories/usecases/product/getProductByIdFactory"
import { NextRequest, NextResponse } from "next/server"

interface Params {
    id: string
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    const productId = params.id
    const type = req.nextUrl.searchParams.get("type") as ProductType
    const foundProduct = await getProductByIdUseCase.execute(productId, type)

    if (!foundProduct) {
        return NextResponse.json(
            { errors: [`product with id: '${productId}' not found`] },
            { status: 404 }
        )
    }

    return NextResponse.json({ data: foundProduct }, { status: 200 })
}
