import { Document } from "mongodb"
import { nameRegexp } from "../../../../domain/entities/user/utils"

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
            slug: { bsonType: "string", minLength: 4 },
            name: { bsonType: "string", minLength: 4 },
            shortName: { bsonType: "string", minLength: 3 },
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
                        item: { bsonType: "string", minLength: 4 }
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
                        slug: { bsonType: "string", minLength: 3 },
                        name: { bsonType: "string", minLength: 4 },
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
        required: ["name", "email", "password", "images"],
        properties: {
            _id: {},
            name: {
                bsonType: "string",
                minLength: 5,
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
                required: ["profile", "profileThumb"],
                properties: {
                    profile: userImageMongoSchema,
                    profileThumb: userImageMongoSchema
                }
            }
        }
    }
}
