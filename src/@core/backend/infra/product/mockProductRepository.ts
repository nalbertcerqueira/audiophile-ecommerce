import { ProductProps } from "../../domain/entities/product"
import { GetProductsByCategoryRepository } from "../../domain/repositories/getProductsByCategoryRepository"
import { cwd } from "process"
import { readFile } from "fs/promises"
import { resolve } from "path"
import { GetProductsRepository } from "../../domain/repositories/getProductsRepository"

export class MockProductRepository
    implements GetProductsByCategoryRepository, GetProductsRepository
{
    public async getByCategory(category: string): Promise<ProductProps[]> {
        const allProducts = await this.getData()
        return allProducts.filter((product) => product.category === category)
    }

    public async getAll(): Promise<ProductProps[]> {
        const allProducts = await this.getData()
        return allProducts
    }

    private async getData(): Promise<ProductProps[]> {
        const filePath = resolve(cwd(), "./mocks/data.json")
        const data = await readFile(filePath, { encoding: "utf-8" })
        const jsonData = JSON.parse(data) as ProductProps[]

        return jsonData
    }
}
