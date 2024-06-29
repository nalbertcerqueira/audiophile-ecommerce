import { ProductFromType, ProductType } from "./protocols"

export interface GetProductsByIdRepository {
    getProductsByIds<T extends ProductType>(
        ids: string[],
        type: T
    ): Promise<ProductFromType<T>[]>
}
