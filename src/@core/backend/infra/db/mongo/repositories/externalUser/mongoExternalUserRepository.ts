import { FindExternalUserByEmailRepository } from "@/@core/backend/domain/repositories/externalUser/findExternalUserByEmailRepository"
import { FindExternalUserByIdRepository } from "@/@core/backend/domain/repositories/externalUser/findExternalUserByIdRepository"
import { UpsertExternalUserRepository } from "@/@core/backend/domain/repositories/externalUser/upsertExternalUserRepository"
import { ExternalUserWithId } from "@/@core/backend/domain/repositories/externalUser/protocols"
import { MongoExternalUser } from "../../models"
import { ExternalUser } from "@/@core/shared/entities/user/externalUser"
import { mongoHelper } from "../../config/mongo-config"
import { ObjectId } from "mongodb"

export class MongoExternalUserRepository
    implements
        FindExternalUserByEmailRepository,
        UpsertExternalUserRepository,
        FindExternalUserByIdRepository
{
    public async findByEmail(email: string): Promise<ExternalUserWithId | null> {
        await mongoHelper.connect()

        const userCollection = mongoHelper.db.collection<MongoExternalUser>("externalUsers")
        const foundUser = await userCollection.findOne(
            { email },
            { projection: { createdAt: 0, updatedAt: 0 } }
        )

        if (foundUser) {
            const { _id, firstName, lastName, email, images } = foundUser
            return { id: _id.toString(), firstName, lastName, email, images }
        }

        return null
    }

    public async upsert(user: ExternalUser): Promise<ExternalUserWithId> {
        await mongoHelper.connect()

        const creationDate = new Date()
        const { firstName, lastName, email, images } = user.toJSON()

        const userCollection =
            mongoHelper.db.collection<Omit<MongoExternalUser, "_id">>("externalUsers")

        const updatedUser = await userCollection.findOneAndUpdate(
            { email },
            {
                $set: { firstName, lastName, images: { ...images } },
                $setOnInsert: { email, createdAt: creationDate, updatedAt: creationDate }
            },
            { upsert: true, returnDocument: "after" }
        )

        if (!updatedUser) throw new Error("findOneAndUpdate operation failed")

        return {
            id: updatedUser._id.toString(),
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            images: { ...updatedUser.images }
        }
    }

    public async findById(userId: string): Promise<ExternalUser | null> {
        await mongoHelper.connect()

        try {
            const id = new ObjectId(userId)

            const externalUserCollection = mongoHelper.db.collection("externalUsers")
            const foundExternalUser = await externalUserCollection.findOne<MongoExternalUser>(
                { _id: id },
                { projection: { createdAt: 0, updatedAt: 0 } }
            )

            if (foundExternalUser) {
                const { firstName, lastName, email, images } = foundExternalUser
                return new ExternalUser({ firstName, lastName, email, images: images })
            }

            return null
        } catch {
            return null
        }
    }
}
