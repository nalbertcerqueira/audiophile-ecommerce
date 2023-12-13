import { User } from "@/@core/shared/entities/user/user"
import {
    AddUserRepository,
    UserWithoutId
} from "@/@core/backend/domain/repositories/user/addUserRepository"
import { FindUserByEmailRepository } from "@/@core/backend/domain/repositories/user/findUserByEmailRepository"
import { mongoHelper } from "../../config/mongo-config"
import { MongoUser } from "../../models"
import { FindUserByIdRepository } from "@/@core/backend/domain/repositories/user/findUserByIdRepository"
import { ObjectId } from "mongodb"

export class MongoUserRepository
    implements AddUserRepository, FindUserByEmailRepository, FindUserByIdRepository
{
    public async findByEmail(email: string): Promise<User | null> {
        await mongoHelper.connect()

        const userCollection = mongoHelper.db.collection("users")
        const foundUser = await userCollection.findOne<MongoUser>({ email })

        if (foundUser) {
            const { _id, name, email, password, images } = foundUser
            return new User({ id: _id.toString(), name, email, password, images })
        }

        return null
    }

    public async add(userProps: UserWithoutId): Promise<void> {
        await mongoHelper.connect()

        const userCollection = mongoHelper.db.collection<Omit<MongoUser, "_id">>("users")

        const creationDate = new Date()

        await userCollection.insertOne({
            ...userProps,
            createdAt: creationDate,
            updatedAt: creationDate
        })
    }

    public async findById(userId: string): Promise<User | null> {
        await mongoHelper.connect()

        try {
            const _id = new ObjectId(userId)

            const userCollection = mongoHelper.db.collection("users")
            const foundUser = await userCollection.findOne<MongoUser>({ _id })

            if (foundUser) {
                const { _id, name, email, password, images } = foundUser
                return new User({ id: _id.toString(), name, email, password, images })
            }

            return null
        } catch {
            return null
        }
    }
}
