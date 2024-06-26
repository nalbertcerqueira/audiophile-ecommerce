import { ProductProps } from "../../../../../shared/entities/product/product"
import {
    cartItemMongoSchema,
    externalUserMongoSchema,
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
        await this.uploadInitialData()
        await mongoHelper.close()
    }

    //Populando o banco de dados com as informações dos produtos caso o mesmo esteja vazio
    private async uploadInitialData(): Promise<void> {
        await mongoHelper.connect()
        const productCollection = mongoHelper.db.collection("products")

        const filePath = resolve(cwd(), "./mocks/data.json")
        const data = await readFile(filePath, { encoding: "utf-8" })
        const products = JSON.parse(data) as ProductProps[]

        const emptyCollection = (await productCollection.find().toArray()).length === 0

        if (emptyCollection) {
            const { insertedCount } = await productCollection.insertMany(products)
            console.log(`Inserted ${insertedCount} items with success!`)
            console.log("Migration finished.")
        } else {
            console.log("Current database is already populated. No need to populate again.")
        }
    }

    //Criando as coleções juntamente com sua respectivas validações de schemas
    private async createCollections(): Promise<void> {
        await Promise.allSettled([
            mongoHelper.db.createCollection("products", { validator: productMongoSchema }),
            mongoHelper.db.createCollection("users", { validator: userMongoSchema }),
            mongoHelper.db.createCollection("externalUsers", {
                validator: externalUserMongoSchema
            }),
            mongoHelper.db.createCollection("cartItems", {
                validator: cartItemMongoSchema
            }),
            mongoHelper.db.createCollection("checkoutOrders", {
                validator: mongoCheckoutOrderSchema
            })
        ])
    }
}

new Migration().run().catch((error) => {
    console.log(error)
    process.exit(1)
})
