import { ProductProps } from "../../../../../shared/entities/product/product"
import {
    cartItemMongoSchema,
    mongoCheckoutOrderSchema,
    productMongoSchema,
    userMongoSchema
} from "./mongo-schemas"
import { mongoHelper } from "./mongo-config"
import { readFile } from "fs/promises"
import { resolve } from "path"
import { cwd } from "process"

export class Migration {
    public async run(): Promise<void> {
        await this.createCollections()
        await this.updloadInitialData()
        await mongoHelper.close()
    }

    private async updloadInitialData(): Promise<void> {
        await mongoHelper.connect()
        const productCollection = mongoHelper.db.collection("products")

        const filePath = resolve(cwd(), "./mocks/data.json")
        const data = await readFile(filePath, { encoding: "utf-8" })
        const products = JSON.parse(data) as ProductProps[]

        const emptyCollection = (await productCollection.find().toArray()).length === 0

        if (emptyCollection) {
            const { insertedCount } = await productCollection.insertMany(products)
            console.log(`Inserted ${insertedCount} items with sucess!`)
            console.log("Migration finished.")
        } else {
            console.log("Current database is already populated. No need to populate again.")
        }
    }

    private async createCollections(): Promise<void> {
        try {
            await Promise.allSettled([
                mongoHelper.db.createCollection("products", { validator: productMongoSchema }),
                mongoHelper.db.createCollection("users", { validator: userMongoSchema }),
                mongoHelper.db.createCollection("cartItems", {
                    validator: cartItemMongoSchema
                }),
                mongoHelper.db.createCollection("checkoutOrders", {
                    validator: mongoCheckoutOrderSchema
                })
            ])
        } catch {
            null
        }
    }
}

new Migration().run().catch((error) => {
    console.log(error)
    process.exit(1)
})
