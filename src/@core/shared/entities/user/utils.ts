import { UserProps } from "./user"
import { ZodHelper } from "../helpers"
import { ExternalUserProps } from "./externalUser"
import z from "zod"

export const userZodSchema = ZodHelper.schemaFromType<UserProps>()(
    z.object({
        email: ZodHelper.email("Email"),
        password: ZodHelper.password("Password"),
        firstName: ZodHelper.userName("First name", 4),
        lastName: ZodHelper.userName("Last name", 4),
        phone: ZodHelper.phone("Phone").nullable(),
        profileImg: z.string().trim().url().nullable()
    })
).strict()

export const externalUserZodSchema = ZodHelper.schemaFromType<ExternalUserProps>()(
    userZodSchema.omit({ firstName: true, lastName: true, password: true }).extend({
        firstName: z.string().trim().min(1),
        lastName: z.string().trim().min(1)
    })
).strict()
