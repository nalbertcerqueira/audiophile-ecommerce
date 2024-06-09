import {
    BasicUserInfo,
    FindUserByIdRepository
} from "@/@core/backend/domain/repositories/user/findUserByIdRepository"
import {
    FindUserByEmailRepository,
    UserWithId
} from "@/@core/backend/domain/repositories/user/findUserByEmailRepository"
import { AddUserRepository } from "@/@core/backend/domain/repositories/user/addUserRepository"
import { mongoHelper } from "../../config/mongo-config"
import { MongoUser } from "../../models"
import { User } from "@/@core/shared/entities/user/user"
import { ObjectId } from "mongodb"

export class MongoUserRepository
    implements AddUserRepository, FindUserByEmailRepository, FindUserByIdRepository
{
    public async findByEmail(email: string): Promise<UserWithId | null> {
        await mongoHelper.connect()

        const userCollection = mongoHelper.db.collection<MongoUser>("users")
        const foundUser = await userCollection.findOne<MongoUser>({ email })

        if (foundUser) {
            const { _id, firstName, lastName, email, password, images } = foundUser
            return { id: _id.toString(), firstName, lastName, email, password, images }
        }

        return null
    }

    public async add(user: User): Promise<void> {
        await mongoHelper.connect()

        const userCollection = mongoHelper.db.collection<Omit<MongoUser, "_id">>("users")

        const creationDate = new Date()

        await userCollection.insertOne({
            ...user.toJSON(),
            createdAt: creationDate,
            updatedAt: creationDate
        })
    }

    public async findById(userId: string): Promise<BasicUserInfo | null> {
        await mongoHelper.connect()

        try {
            const id = new ObjectId(userId)

            const userCollection = mongoHelper.db.collection<MongoUser>("users")
            const foundUser = await userCollection.findOne<Omit<MongoUser, "password">>(
                { _id: id },
                { projection: { password: 0 } }
            )

            if (!foundUser) {
                return null
            }

            const { _id, firstName, lastName, email, images } = foundUser
            return { id: _id.toString(), firstName, lastName, email, images }
        } catch {
            return null
        }
    }
}
