import {
    FindUserByEmailRepository,
    UserWithId
} from "@/@core/backend/domain/repositories/user/findUserByEmailRepository"
import { FindUserByIdRepository } from "@/@core/backend/domain/repositories/user/findUserByIdRepository"
import { AddUserRepository } from "@/@core/backend/domain/repositories/user/addUserRepository"
import { User, UserProps } from "@/@core/shared/entities/user/user"
import { mongoHelper } from "../../config/mongo-config"
import { MongoUser } from "../../models"
import { ObjectId } from "mongodb"

export class MongoUserRepository
    implements AddUserRepository, FindUserByEmailRepository, FindUserByIdRepository
{
    public async findByEmail(email: string): Promise<UserWithId | null> {
        await mongoHelper.connect()

        const userCollection = mongoHelper.db.collection<MongoUser>("users")
        const foundUser = await userCollection.findOne<MongoUser>(
            { email },
            { projection: { createdAt: 0, updatedAt: 0 } }
        )

        if (foundUser) {
            const { _id, firstName, lastName, email, password, profileImg, phone } = foundUser
            const id = _id.toString()

            return { id, firstName, lastName, email, password, profileImg, phone }
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

    public async findById(userId: string): Promise<Omit<UserProps, "password"> | null> {
        await mongoHelper.connect()

        try {
            new ObjectId(userId)
        } catch {
            return null
        }

        const id = new ObjectId(userId)

        const userCollection = mongoHelper.db.collection<MongoUser>("users")
        const foundUser = await userCollection.findOne<Omit<MongoUser, "password">>(
            { _id: id },
            { projection: { password: 0, createdAt: 0, updatedAt: 0 } }
        )

        if (!foundUser) {
            return null
        }

        const { firstName, lastName, email, profileImg, phone } = foundUser
        return { firstName, lastName, email, profileImg, phone }
    }
}
