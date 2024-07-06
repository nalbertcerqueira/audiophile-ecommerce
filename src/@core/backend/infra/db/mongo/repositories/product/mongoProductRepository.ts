import {
    ProductFromType,
    ProductType
} from "@/@core/backend/domain/repositories/product/protocols"
import { GetProductsByCategoryRepository } from "@/@core/backend/domain/repositories/product/getProductsByCategoryRepository"
import { GetProductsByIdRepository } from "@/@core/backend/domain/repositories/product/getProductsByIdRepository"
import { GetProductByIdRepository } from "@/@core/backend/domain/repositories/product/getProductByIdRepository"
import { GetProductsRepository } from "@/@core/backend/domain/repositories/product/getProductsRepository"
import { MongoProduct } from "../../models"
import { ProductProps } from "@/@core/shared/entities/product/product"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { mongoHelper } from "../../config/mongo-config"
import { ObjectId } from "mongodb"

export class MongoProductRepository
    implements
        GetProductsByCategoryRepository,
        GetProductsByIdRepository,
        GetProductsRepository,
        GetProductByIdRepository
{
    public async getByCategory(category: string): Promise<ProductProps[]> {
        await mongoHelper.connect()

        const productCollection = mongoHelper.db.collection("products")
        const products = await productCollection.find<MongoProduct>({ category }).toArray()

        return products.map(({ _id, ...productProps }) => {
            return { id: _id.toString(), ...productProps }
        })
    }

    public async getAll(): Promise<ProductProps[]> {
        await mongoHelper.connect()

        const productCollection = mongoHelper.db.collection("products")
        const products = await productCollection.find<MongoProduct>({}).toArray()

        return products.map(({ _id, ...productProps }) => {
            return { id: _id.toString(), ...productProps }
        })
    }

    public async getProductsByIds<T extends ProductType>(
        ids: string[],
        type: T
    ): Promise<ProductFromType<T>[]> {
        await mongoHelper.connect()

        const productCollection = mongoHelper.db.collection("products")
        const validIds = ids.map((id) => {
            try {
                return new ObjectId(id)
            } catch {
                return null
            }
        })

        if (type === "shortProduct") {
            const shortProductQuery = this.getShortProductQuery()
            const items = await productCollection
                .aggregate<CartProduct>([
                    { $match: { _id: { $in: validIds } } },
                    shortProductQuery
                ])
                .toArray()

            return items as ProductFromType<T>[]
        }

        if (type === "fullProduct") {
            const products = await productCollection
                .find<MongoProduct>({ _id: { $in: validIds as ObjectId[] } })
                .toArray()

            return products.map(({ _id, ...rest }) => ({
                id: _id.toString(),
                ...rest
            })) as ProductFromType<T>[]
        }

        return []
    }

    public async getById<T extends ProductType>(
        productId: string,
        type: T
    ): Promise<ProductFromType<T> | null> {
        await mongoHelper.connect()

        try {
            new ObjectId(productId)
        } catch {
            return null
        }

        const _id = new ObjectId(productId)
        const productCollection = mongoHelper.db.collection("products")

        if (type === "shortProduct") {
            const shortProductQuery = this.getShortProductQuery()
            const shortProducts = await productCollection
                .aggregate<CartProduct>([{ $match: { _id } }, shortProductQuery])
                .toArray()

            if (shortProducts[0]) {
                return shortProducts[0] as ProductFromType<T>
            }

            return null
        }

        if (type === "fullProduct") {
            const product = await productCollection.findOne<MongoProduct>({ _id })

            if (product) {
                const { _id, ...rest } = product
                return { id: _id.toString(), ...rest } as ProductFromType<T>
            }
        }

        return null
    }

    //Pipeline de agregação para retirar apenas as propriedades necessárias
    //caso o tipo do produto seja 'short'
    private getShortProductQuery() {
        return {
            $project: {
                productId: { $toString: "$_id" },
                slug: "$slug",
                name: "$shortName",
                price: "$price",
                quantity: { $literal: 0 },
                _id: 0
            }
        }
    }
}
