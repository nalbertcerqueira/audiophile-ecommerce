import { User } from "@/@core/backend/domain/entities/user/user"
import {
    AddUserRepository,
    UserWithoutId
} from "@/@core/backend/domain/repositories/user/addUserRepository"
import { FindUserByEmailRepository } from "@/@core/backend/domain/repositories/user/findUserByEmailRepository"
import { mongoHelper } from "../../config/mongo-config"
import { MongoUser } from "../../models"

export class MongoUserRepository implements AddUserRepository, FindUserByEmailRepository {
    public async findByEmail(email: string): Promise<User | null> {
        await mongoHelper.connect()

        const userCollection = mongoHelper.db.collection("users")
        const foundUser = await userCollection.findOne<MongoUser>({ email })

        if (foundUser) {
            const { _id, ...otherProps } = foundUser
            return new User({ ...otherProps, id: _id.toString() })
        }

        return null
    }

    public async add(userProps: UserWithoutId): Promise<User> {
        await mongoHelper.connect()

        const userCollection = mongoHelper.db.collection("users")
        const addedUser = await userCollection.insertOne({ ...userProps })

        return new User({ ...userProps, id: addedUser.insertedId.toString() })
    }
}
