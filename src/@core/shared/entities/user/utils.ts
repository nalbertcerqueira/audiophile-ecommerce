import { UserProps } from "./user"
import { schemaFromType } from "../helpers"
import z from "zod"
import { ExternalUserProps } from "./externalUser"

export const nameRegexp = /^[A-zÀ-ú\s]+$/
export const nameMessage = "can only have letters"
export const nameLengthMessage = "must have at least 4 character(s)"

export const passwordRegexp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%+<>,.?-]).+$/g
export const passwordMessage = "must contain letters, numbers and 1 especial character"
export const passwordLengthMessage = "must have at least 8 character(s)"

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

export const userZodSchema = schemaFromType<UserProps>()(
    z.object({
        email: emailZodSchema,
        password: passwordZodSchema,
        firstName: userNameZodSchema,
        lastName: userNameZodSchema,
        images: z.object({ profile: z.string().trim().url().nullable() }).strict()
    })
).strict()

export const externalUserZodSchema = schemaFromType<ExternalUserProps>()(
    userZodSchema.omit({ firstName: true, lastName: true, password: true }).extend({
        firstName: z.string().trim().min(1),
        lastName: z.string().trim().min(1)
    })
).strict()
