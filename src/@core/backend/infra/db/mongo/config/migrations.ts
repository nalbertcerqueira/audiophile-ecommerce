import { ProductProps } from "@/@core/backend/domain/entities/product"
import { productMongoSchema } from "./mongo-schemas"
import { mongoHelper } from "./mongo-config"
import { readFile } from "fs/promises"
import { resolve } from "path"
import { cwd } from "process"

export class Migration {
    public async run(): Promise<void> {
        await this.createCollections()
        await this.updloadInitialData()
    }

    private async updloadInitialData(): Promise<void> {
        await mongoHelper.connect()
        const productCollection = mongoHelper.db.collection("products")

        const filePath = resolve(cwd(), "./mocks/data.json")
        const data = await readFile(filePath, { encoding: "utf-8" })
        const products = JSON.parse(data) as ProductProps[]

        const emptyCollection = (await productCollection.find().toArray()).length === 0

        if (emptyCollection) {
            await productCollection.insertMany(products)
            console.log("migration finished!")
        }

        await mongoHelper.close()
    }

    private async createCollections(): Promise<void> {
        try {
            await Promise.all([
                mongoHelper.db.createCollection("products", { validator: productMongoSchema })
            ])
        } catch {
            null
        }
    }
}

new Migration().run().catch((error) => console.log(error.message))
