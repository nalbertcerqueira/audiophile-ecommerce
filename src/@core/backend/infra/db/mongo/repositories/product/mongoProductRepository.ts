import { ProductProps } from "../../../../../domain/entities/product/product"
import { GetProductsByCategoryRepository } from "../../../../../domain/repositories/product/getProductsByCategoryRepository"
import { GetProductsRepository } from "../../../../../domain/repositories/product/getProductsRepository"
import { mongoHelper } from "../../config/mongo-config"
import { MongoProduct } from "../../models"

export class MongoProductRepository
    implements GetProductsByCategoryRepository, GetProductsRepository
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
}
