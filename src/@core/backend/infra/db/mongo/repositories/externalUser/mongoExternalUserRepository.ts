import { FindExternalUserByEmailRepository } from "@/@core/backend/domain/repositories/externalUser/findExternalUserByEmailRepository"
import { FindExternalUserByIdRepository } from "@/@core/backend/domain/repositories/externalUser/findExternalUserByIdRepository"
import { AddExternalUserRepository } from "@/@core/backend/domain/repositories/externalUser/addExternalUserRepository"
import { ExternalUserWithId } from "@/@core/backend/domain/repositories/externalUser/protocols"
import { MongoExternalUser } from "../../models"
import { ExternalUser } from "@/@core/shared/entities/user/externalUser"
import { mongoHelper } from "../../config/mongo-config"
import { ObjectId } from "mongodb"
import {
    ExternalUserParams,
    UpdateExternalUserRepository
} from "@/@core/backend/domain/repositories/externalUser/updateExternalUserRepository"

export class MongoExternalUserRepository
    implements
        FindExternalUserByEmailRepository,
        AddExternalUserRepository,
        FindExternalUserByIdRepository,
        UpdateExternalUserRepository
{
    public async findByEmail(email: string): Promise<ExternalUserWithId | null> {
        await mongoHelper.connect()

        const userCollection = mongoHelper.db.collection<MongoExternalUser>("externalUsers")
        const foundUser = await userCollection.findOne(
            { email },
            { projection: { address: 0, createdAt: 0, updatedAt: 0 } }
        )

        if (foundUser) {
            const { _id, firstName, lastName, email, profileImg, phone } = foundUser
            const id = _id.toString()
            return { id, firstName, lastName, email, profileImg, phone }
        }

        return null
    }

    public async add(user: ExternalUser): Promise<{ id: string }> {
        await mongoHelper.connect()

        const creationDate = new Date()
        const { firstName, lastName, email, profileImg } = user.toJSON()

        const userCollection =
            mongoHelper.db.collection<Omit<MongoExternalUser, "_id">>("externalUsers")

        const newUser = await userCollection.insertOne({
            firstName,
            lastName,
            email,
            profileImg,
            phone: null,
            address: null,
            createdAt: creationDate,
            updatedAt: creationDate
        })

        return { id: newUser.insertedId.toString() }
    }

    public async findById(userId: string): Promise<ExternalUserWithId | null> {
        await mongoHelper.connect()

        try {
            new ObjectId(userId)
        } catch {
            return null
        }

        const externalUserCollection = mongoHelper.db.collection("externalUsers")
        const foundExternalUser = await externalUserCollection.findOne<MongoExternalUser>(
            { _id: new ObjectId(userId) },
            { projection: { address: 0, createdAt: 0, updatedAt: 0 } }
        )

        if (!foundExternalUser) {
            return null
        }

        const { _id, ...rest } = foundExternalUser
        return { id: _id.toString(), ...rest }
    }

    public async update(
        id: string,
        props: ExternalUserParams
    ): Promise<ExternalUserWithId | null> {
        await mongoHelper.connect()

        try {
            new ObjectId(id)
        } catch {
            return null
        }

        const userCollection = mongoHelper.db.collection<MongoExternalUser>("externalUsers")
        const updatedUser = await userCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { ...props, updatedAt: new Date() } },
            {
                ignoreUndefined: true,
                returnDocument: "after",
                projection: { address: 0, createdAt: 0, updatedAt: 0 }
            }
        )

        if (!updatedUser) {
            return null
        }

        const { _id, email, firstName, lastName, phone, profileImg } = updatedUser
        return { id: _id.toString(), email, firstName, lastName, phone, profileImg }
    }
}
