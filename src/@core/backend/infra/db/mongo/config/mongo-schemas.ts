import { Document } from "mongodb"

const categoryMongoSchema: Document = {
    bsonType: "string",
    enum: ["headphones", "speakers", "earphones"]
}
const imageMongoSchema: Document = {
    bsonType: "object",
    additionalProperties: false,
    required: ["desktop", "tablet", "mobile"],
    properties: {
        desktop: { bsonType: "string" },
        tablet: { bsonType: "string" },
        mobile: { bsonType: "string" }
    }
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
            image: imageMongoSchema,
            category: categoryMongoSchema,
            categoryImage: imageMongoSchema,
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
                    first: imageMongoSchema,
                    second: imageMongoSchema,
                    third: imageMongoSchema
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
                        image: imageMongoSchema
                    }
                }
            }
        }
    }
}
