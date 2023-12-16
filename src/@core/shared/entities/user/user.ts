import { generateCustomZodErrors } from "../helpers"
import { EntityValidationResult } from "../protocols"
import { userZodSchema } from "./utils"

export interface UserProps {
    readonly id: string
    name: string
    email: string
    password: string
    images: {
        profile: string | null
        profileThumb: string | null
    }
}

export class User {
    private props: UserProps
    public static readonly userSchema = userZodSchema

    public static validateUser(user: any): EntityValidationResult<UserProps> {
        const validationResult = this.userSchema.safeParse(user)

        if (validationResult.success) {
            return { success: true, data: validationResult.data }
        } else
            return {
                success: false,
                errors: generateCustomZodErrors(validationResult.error, 1)
            }
    }

    constructor(props: UserProps) {
        const validationResult = User.validateUser(props)

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
