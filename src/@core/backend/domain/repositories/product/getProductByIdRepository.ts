import { ProductFromType, ProductType } from "./protocols"

export interface GetProductByIdRepository {
    getById<T extends ProductType>(
        productId: string,
        type: T
    ): Promise<ProductFromType<T> | null>
}
