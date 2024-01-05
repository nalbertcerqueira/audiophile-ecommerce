import { FindExternalUserByEmailRepository } from "@/@core/backend/domain/repositories/externalUser/findExternalUserByEmailRepository"
import { ExternalUserWithId } from "@/@core/backend/domain/repositories/externalUser/protocols"
import { mongoHelper } from "../../config/mongo-config"
import { MongoExternalUser } from "../../models"
import { AddExternalUserRepository } from "@/@core/backend/domain/repositories/externalUser/addExternalUserRepositry"
import { ExternalUser } from "@/@core/shared/entities/user/externalUser"
import { FindExternalUserByIdRepository } from "@/@core/backend/domain/repositories/externalUser/findExternalUserByIdRepository"
import { ObjectId } from "mongodb"

export class MongoExternalUserRepository
    implements
        FindExternalUserByEmailRepository,
        AddExternalUserRepository,
        FindExternalUserByIdRepository
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

    public async findById(userId: string): Promise<ExternalUser | null> {
        await mongoHelper.connect()

        try {
            const id = new ObjectId(userId)

            const externalUserCollection = mongoHelper.db.collection("externalUsers")
            const foundExternalUser = await externalUserCollection.findOne<MongoExternalUser>({
                _id: id
            })

            if (foundExternalUser) {
                const { name, email, images } = foundExternalUser
                return new ExternalUser({ name, email, images: images })
            }

            return null
        } catch {
            return null
        }
    }
}
