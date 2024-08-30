import { UserProps } from "./user"
import { schemaFromType } from "../helpers"
import { ExternalUserProps } from "./externalUser"
import z from "zod"

export const nameRegexp = /^[A-zÀ-ú\s]+$/
export const nameMessage = "can only have letters"
export const nameLengthMessage = "must have at least 4 character(s)"

export const passwordRegexp = /^(?=.*[A-zÀ-ú])(?=.*[0-9])(?=.*[!@#$%+<>,.?-]).+$/g
export const passwordMessage = "must contain letters, numbers and 1 especial character"
export const passwordLengthMessage = "must have at least 8 character(s)"

export const phoneRegexp = /^[0-9]+$/
export const phoneMessage = "must contain only numbers"
export const phoneLengthMessage = "must have at least 10 character(s)"

export const emailZodSchema = z.string().trim().email("is invalid")

export const userNameZodSchema = z
    .string()
    .trim()
    .min(4, nameLengthMessage)
    .refine((name) => name.match(nameRegexp), { message: nameMessage, path: [""] })
    .refine((input) => input.replace(/ /g, "").length >= 4, {
        message: nameLengthMessage,
        path: [""]
    })

export const passwordZodSchema = z
    .string()
    .min(8, passwordLengthMessage)
    .refine((password) => password.match(passwordRegexp), {
        message: passwordMessage,
        path: [""]
    })

export function phoneZodSchema(
    nullable: true
): z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>
export function phoneZodSchema(nullable: false): z.ZodEffects<z.ZodString, string, string>
export function phoneZodSchema(nullable: boolean) {
    const schema = z
        .string()
        .min(10, phoneLengthMessage)
        .refine((phone) => phone?.match(phoneRegexp) ?? true, {
            message: phoneMessage,
            path: [""]
        })

    return nullable ? schema.nullable() : schema
}

export const userZodSchema = schemaFromType<UserProps>()(
    z.object({
        email: emailZodSchema,
        password: passwordZodSchema,
        firstName: userNameZodSchema,
        lastName: userNameZodSchema,
        phone: phoneZodSchema(true),
        profileImg: z.string().trim().url().nullable()
    })
).strict()

export const externalUserZodSchema = schemaFromType<ExternalUserProps>()(
    userZodSchema.omit({ firstName: true, lastName: true, password: true }).extend({
        firstName: z.string().trim().min(1),
        lastName: z.string().trim().min(1)
    })
).strict()
