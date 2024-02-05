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

const userImageMongoSchema: Document = {
    oneOf: [
        {
            bsonType: "string",
            pattern: "^(https|http)://"
        },
        {
            bsonType: "null"
        }
    ]
}

const userNameMongoSchema: Document = {
    bsonType: "string",
    minLength: 6,
    pattern: `${nameRegexp.source}`
}

const userEmailMongoSchema: Document = {
    bsonType: "string",
    minLength: 6,
    pattern: "^[a-zA-Z0-9._%+-]{1,}@[a-zA-Z0-9.-]{1,}\\.[a-zA-Z0-9]{2,}$"
}

const dateMongoSchema: Document = {
    bsonType: "date"
}

const userTypeMongoSchema: Document = {
    bsonType: "string",
    enum: ["authenticated", "external", "guest"]
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
            createdAt: dateMongoSchema,
            updatedAt: dateMongoSchema,
            name: userNameMongoSchema,
            email: userEmailMongoSchema,
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
            }
        }
    }
}

export const externalUserMongoSchema: Document = {
    $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: ["name", "email", "images", "createdAt", "updatedAt"],
        properties: {
            _id: {},
            createdAt: dateMongoSchema,
            updatedAt: dateMongoSchema,
            email: userEmailMongoSchema,
            name: { bsonType: "string", minLength: 1 },
            images: {
                bsonType: "object",
                additionalProperties: false,
                required: ["profile"],
                properties: {
                    profile: userImageMongoSchema
                }
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
            userType: userTypeMongoSchema,
            productId: { bsonType: "string" },
            quantity: { bsonType: "int", minimum: 1 },
            createdAt: dateMongoSchema,
            updatedAt: dateMongoSchema
        }
    }
}

export const mongoCheckoutOrderSchema: Document = {
    $jsonSchema: {
        bsonType: "object",
        required: ["userId", "userType", "orderId", "costumer", "cartItems", "createdAt"],
        additionalProperties: false,
        properties: {
            _id: {},
            userId: { bsonType: "string" },
            userType: userTypeMongoSchema,
            orderId: { bsonType: "string", minLength: 1 },
            costumer: {
                bsonType: "object",
                required: ["name", "email"],
                additionalProperties: false,
                properties: {
                    name: userNameMongoSchema,
                    email: userEmailMongoSchema
                }
            },
            cartItems: {
                bsonType: "array",
                minItems: 1,
                items: {
                    bsonType: "object",
                    additionalProperties: false,
                    required: ["productId", "quantity"],
                    properties: {
                        productId: { bsonType: "string" },
                        quantity: { bsonType: "int", minimum: 1 }
                    }
                }
            },
            createdAt: dateMongoSchema
        }
    }
}
