import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { ProductProps } from "../../../../../domain/entities/product/product"
import { GetProductsByCategoryRepository } from "../../../../../domain/repositories/product/getProductsByCategoryRepository"
import { GetProductsRepository } from "../../../../../domain/repositories/product/getProductsRepository"
import { mongoHelper } from "../../config/mongo-config"
import { MongoShortProduct, MongoProduct } from "../../models"
import { GetProductByIdRepository } from "@/@core/backend/domain/repositories/product/getProductByIdRepository"
import { ObjectId } from "mongodb"
import { ProductType } from "@/@core/backend/domain/repositories/product/protocols"

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

    public async getAll(type: ProductType): Promise<ProductProps[] | CartProduct[]> {
        await mongoHelper.connect()

        const productCollection = mongoHelper.db.collection("products")

        if (type === "shortProduct") {
            const shortProductQuery = this.getShortProductQuery()
            const shortProducts = await productCollection
                .aggregate<MongoShortProduct>([shortProductQuery])
                .toArray()

            return shortProducts.map(({ productId, ...otherProps }) => {
                return {
                    productId: productId.toString(),
                    ...otherProps
                }
            })
        }

        const products = await productCollection.find<MongoProduct>({}).toArray()
        return products.map(({ _id, ...productProps }) => {
            return { id: _id.toString(), ...productProps }
        })
    }

    public async getById(
        productId: string,
        type: ProductType
    ): Promise<ProductProps | CartProduct | null> {
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
                return { productId: productId.toString(), ...otherProps }
            }

            return null
        }

        const product = await productCollection.findOne<MongoProduct>({ _id })

        if (product) {
            const { _id, ...otherProps } = product
            return { id: _id.toString(), ...otherProps }
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
