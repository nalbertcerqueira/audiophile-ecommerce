import { generateCustomZodErrors } from "../helpers"
import { EntityValidationResult } from "../protocols"
import { userZodSchema } from "./utils"

export type UserType = "authenticated" | "external" | "guest"

export interface UserProps {
    name: string
    email: string
    password: string
    images: {
        profile: string | null
    }
}

//Representação de um usuário comum
export class User {
    private props: UserProps
    public static readonly userSchema = userZodSchema

    public static validate(user: any): EntityValidationResult<UserProps> {
        const validationResult = this.userSchema.safeParse(user)

        if (!validationResult.success) {
            return {
                success: false,
                errors: generateCustomZodErrors(validationResult.error, 1)
            }
        }

        return { success: true, data: validationResult.data }
    }

    constructor(props: UserProps) {
        const validationResult = User.validate(props)

        if (!validationResult.success) {
            const firstError = validationResult.errors[0]
            throw new Error(firstError)
        }

        const { data } = validationResult
        this.props = { ...data, images: { ...data.images } }
    }

    public toJSON(): UserProps {
        return { ...this.props, images: { ...this.props.images } }
    }
}
