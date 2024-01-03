import { Document } from "mongodb"
import { nameRegexp } from "../../../../../shared/entities/user/utils"

const categoryMongoSchema: Document = {
    bsonType: "string",
    enum: ["headphones", "speakers", "earphones"]
}

const productImageMongoSchema: Document = {
    bsonType: "object",
    additionalProperties: false,
    required: ["desktop", "tablet", "mobile"],
    properties: {
        desktop: { bsonType: "string" },
        tablet: { bsonType: "string" },
        mobile: { bsonType: "string" }
    }
}

const userImageMongoSchema = {
    oneOf: [
        {
            bsonType: "string",
            pattern: "^(https|http)://[a-zA-Z-0-9]{4,}.[a-zA-Z0-9]{2,}$"
        },
        {
            bsonType: "null"
        }
    ]
}

export const productMongoSchema: Document = {
    $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: [
            "slug",
            "name",
            "shortName",
            "image",
            "category",
            "categoryImage",
            "new",
            "price",
            "description",
            "features",
            "others"
        ],
        properties: {
            _id: {},
            slug: { bsonType: "string", minLength: 1 },
            name: { bsonType: "string", minLength: 1 },
            shortName: { bsonType: "string", minLength: 1 },
            image: productImageMongoSchema,
            category: categoryMongoSchema,
            categoryImage: productImageMongoSchema,
            new: { bsonType: "bool" },
            price: { bsonType: ["int", "double"], minimum: 0.01 },
            description: { bsonType: "string" },
            features: { bsonType: "string" },
            includes: {
                bsonType: "array",
                minItems: 1,
                items: {
                    bsonType: "object",
                    additionalProperties: false,
                    required: ["quantity", "item"],
                    properties: {
                        quantity: { bsonType: "int", minimum: 1 },
                        item: { bsonType: "string", minLength: 1 }
                    }
                }
            },
            gallery: {
                bsonType: "object",
                required: ["first", "second", "third"],
                additionalProperties: false,
                properties: {
                    first: productImageMongoSchema,
                    second: productImageMongoSchema,
                    third: productImageMongoSchema
                }
            },
            others: {
                bsonType: "array",
                minItems: 1,
                items: {
                    bsonType: "object",
                    additionalProperties: false,
                    required: ["name", "slug", "category", "image"],
                    properties: {
                        slug: { bsonType: "string", minLength: 1 },
                        name: { bsonType: "string", minLength: 1 },
                        category: categoryMongoSchema,
                        image: productImageMongoSchema
                    }
                }
            }
        }
    }
}

export const userMongoSchema: Document = {
    $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: ["name", "email", "password", "images", "createdAt", "updatedAt"],
        properties: {
            _id: {},
            name: {
                bsonType: "string",
                minLength: 6,
                pattern: `${nameRegexp.source}`
            },
            email: {
                bsonType: "string",
                minLength: 6,
                pattern: "^[a-zA-Z0-9._%+-]{1,}@[a-zA-Z0-9.-]{1,}\\.[a-zA-Z0-9]{2,}$"
            },
            password: {
                bsonType: "string",
                minLength: 8
            },
            images: {
                bsonType: "object",
                additionalProperties: false,
                required: ["profile"],
                properties: {
                    profile: userImageMongoSchema
                }
            },
            createdAt: {
                bsonType: "date"
            },
            updatedAt: {
                bsonType: "date"
            }
        }
    }
}

export const cartItemMongoSchema: Document = {
    $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: ["_id", "userId", "userType", "productId", "quantity", "createdAt"],
        properties: {
            _id: {},
            userId: { bsonType: "string" },
            userType: { bsonType: "string", enum: ["authenticated", "guest"] },
            productId: { bsonType: "string" },
            quantity: { bsonType: "int", minimum: 1 },
            createdAt: { bsonType: "date" }
        }
    }
}
