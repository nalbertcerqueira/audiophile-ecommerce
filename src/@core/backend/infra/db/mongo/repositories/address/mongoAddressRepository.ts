import { UserInfo } from "@/@core/backend/domain/protocols"
import { GetAddressRepository } from "@/@core/backend/domain/repositories/address/getAddressRepository"
import { Address, AddressProps } from "@/@core/shared/entities/address/address"
import { mongoHelper } from "../../config/mongo-config"
import { Collection, ObjectId } from "mongodb"
import { MongoExternalUser, MongoUser } from "../../models"

interface MongoAddress {
    readonly _id: ObjectId
    address: AddressProps | null
}

export class MongoAddressRepository implements GetAddressRepository {
    public async get(user: UserInfo): Promise<Address | null> {
        const { id, type } = user
        await mongoHelper.connect()

        try {
            new ObjectId(id)
        } catch {
            return null
        }

        if (type === "authenticated") {
            const userCollection = mongoHelper.db.collection<MongoUser>("users")
            return await this.getAddress(id, userCollection)
        }

        if (type === "external") {
            const externalUserCollection =
                mongoHelper.db.collection<MongoExternalUser>("externalUsers")
            return this.getAddress(id, externalUserCollection)
        }

        return null
    }

    private async getAddress(
        id: string,
        collection: Collection<any>
    ): Promise<Address | null> {
        const _id = new ObjectId(id)
        const projection = { address: 1 }
        const data = await collection.findOne<MongoAddress>({ _id }, { projection })

        if (data && data.address) {
            const { address, country, city, zipCode } = data.address
            return new Address({ address, country, city, zipCode })
        }

        return null
    }
}
