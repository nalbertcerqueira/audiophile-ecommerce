import { FindExternalUserByEmailRepository } from "@/@core/backend/domain/repositories/externalUser/findExternalUserByEmailRepository"
import { ExternalUserWithId } from "@/@core/backend/domain/repositories/externalUser/protocols"
import { mongoHelper } from "../../config/mongo-config"
import { MongoExternalUser } from "../../models"
import { AddExternalUserRepository } from "@/@core/backend/domain/repositories/externalUser/addExternalUserRepositry"
import { ExternalUser } from "@/@core/shared/entities/user/externalUser"

export class MongoExternalUserRepository
    implements FindExternalUserByEmailRepository, AddExternalUserRepository
{
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

    public async add(user: ExternalUser): Promise<ExternalUserWithId> {
        await mongoHelper.connect()

        const creationDate = new Date()
        const { name, email, images } = user.toJSON()

        const userCollection =
            mongoHelper.db.collection<Omit<MongoExternalUser, "_id">>("externalUsers")

        const { insertedId } = await userCollection.insertOne({
            name,
            email,
            images: { ...images },
            createdAt: creationDate,
            updatedAt: creationDate
        })

        return { id: insertedId.toString(), name, email, images: { ...images } }
    }
}
