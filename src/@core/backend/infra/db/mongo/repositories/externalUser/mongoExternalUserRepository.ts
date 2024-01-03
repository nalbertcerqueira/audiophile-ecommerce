import {
    ExternalUserWithId,
    FindExternalUserByEmailRepository
} from "@/@core/backend/domain/repositories/externalUser/findExternalUserByEmailRepository"
import { mongoHelper } from "../../config/mongo-config"
import { MongoExternalUser } from "../../models"

export class MongoExternalUserRepository implements FindExternalUserByEmailRepository {
    public async findByEmail(email: string): Promise<ExternalUserWithId | null> {
        await mongoHelper.connect()

        const userCollection = mongoHelper.db.collection<MongoExternalUser>("externalUsers")
        const foundUser = await userCollection.findOne({ email })

        if (foundUser) {
            const { name, email, images, _id } = foundUser
            return { id: _id.toString(), name, email, images }
        }

        return null
    }
}
