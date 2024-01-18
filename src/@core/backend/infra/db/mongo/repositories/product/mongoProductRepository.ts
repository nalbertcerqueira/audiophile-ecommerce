import { ProductProps } from "../../../../../../shared/entities/product/product"
import { GetProductsByCategoryRepository } from "../../../../../domain/repositories/product/getProductsByCategoryRepository"
import { GetProductsRepository } from "../../../../../domain/repositories/product/getProductsRepository"
import { mongoHelper } from "../../config/mongo-config"
import { MongoShortProduct, MongoProduct } from "../../models"
import { GetProductByIdRepository } from "@/@core/backend/domain/repositories/product/getProductByIdRepository"
import { ObjectId } from "mongodb"
import {
    ProductFromType,
    ProductType
} from "@/@core/backend/domain/repositories/product/protocols"

export class MongoProductRepository
    implements
        GetProductsByCategoryRepository,
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
            const shortProductsQuery = this.getShortProductQuery()
            const shortProducts = await productCollection
                .aggregate<MongoShortProduct>([{ $match: { _id } }, shortProductsQuery])
                .toArray()

            if (shortProducts[0]) {
                const { productId, ...otherProps } = shortProducts[0]
                return { productId: productId.toString(), ...otherProps } as ProductFromType<T>
            }

            return null
        }

        const product = await productCollection.findOne<MongoProduct>({ _id })

        if (product) {
            const { _id, ...otherProps } = product
            return { id: _id.toString(), ...otherProps } as ProductFromType<T>
        }

        return null
    }

    private getShortProductQuery() {
        return {
            $project: {
                productId: "$_id",
                slug: "$slug",
                name: "$shortName",
                price: "$price",
                quantity: { $literal: 0 },
                _id: 0
            }
        }
    }
}
