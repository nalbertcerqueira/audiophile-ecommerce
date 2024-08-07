import { MongoClient, Db, ClientSession } from "mongodb"
import { config } from "dotenv"

config()

export class MongoHelper {
    private readonly client: MongoClient
    public readonly db: Db
    private isConnected: boolean = false

    constructor(client: MongoClient, dbName: string) {
        this.client = client
        this.db = client.db(dbName)
    }

    public async connect(): Promise<void> {
        //Reaproveitando a conexão existente para não sobrecarregar o servidor
        //com conexões desnecessárias ao banco
        if (this.isConnected) return

        this.clearListeners()
        this.addListeners()

        try {
            await this.client.connect()
            this.isConnected = true
        } catch (error) {
            this.client.close()
            this.isConnected = false
            console.log(error)
            process.exit(1)
        }
    }

    public startSession(): ClientSession {
        return this.client.startSession()
    }

    public async close(): Promise<void> {
        await this.client.close()
    }

    private addListeners(): void {
        this.client.addListener("close", () => {
            console.log("mongodb connection closed")
        })

        this.client.addListener("open", () => {
            console.log("mongodb connected!")
        })
    }

    private clearListeners(): void {
        this.client.removeAllListeners("open")
        this.client.removeAllListeners("close")
    }
}

const dbUrl = process.env.DB_URL as string
export const mongoHelper = new MongoHelper(new MongoClient(dbUrl), "audiophile")
