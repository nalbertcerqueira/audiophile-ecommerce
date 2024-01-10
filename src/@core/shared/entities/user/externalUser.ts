import { generateCustomZodErrors } from "../helpers"
import { EntityValidationResult } from "../protocols"
import { UserProps } from "./user"
import { userZodSchema } from "./utils"

export type ExternalUserProps = Omit<UserProps, "password">

export class ExternalUser {
    private props: ExternalUserProps
    public static readonly externalUserSchema = userZodSchema.omit({ password: true })

    public static validate(user: any): EntityValidationResult<ExternalUserProps> {
        const validationResult = ExternalUser.externalUserSchema.safeParse(user)

        if (!validationResult.success) {
            return {
                success: false,
                errors: generateCustomZodErrors(validationResult.error, 1)
            }
        }

        return { success: true, data: validationResult.data }
    }

    constructor(props: ExternalUserProps) {
        const validationResult = ExternalUser.validate(props)

        if (!validationResult.success) {
            const firstError = validationResult.errors[0]
            throw new Error(firstError)
        }

        const { data } = validationResult
        this.props = { ...data, images: { ...data.images } }
    }

    public toJSON(): ExternalUserProps {
        return {
            ...this.props,
            images: { ...this.props.images }
        }
    }
}
