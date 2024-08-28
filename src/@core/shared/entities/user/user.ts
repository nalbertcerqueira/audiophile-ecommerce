import { userZodSchema } from "./utils"
import { Entity } from "../helpers"

export type UserType = "authenticated" | "external" | "guest"

export interface UserProps {
    firstName: string
    lastName: string
    email: string
    password: string
    profileImg: string | null
    phone: string | null
}

//Entidade que representa um usuário comum
export class User extends Entity<UserProps> {
    private props: UserProps
    private userSchema = userZodSchema

    constructor(props: UserProps) {
        super()
        const validation = this.validate(props, this.userSchema)

        if (!validation.success) {
            const firstError = validation.errors[0]
            throw new Error(firstError)
        }

        const { data } = validation
        this.props = { ...data }
    }

    public toJSON(): UserProps {
        return { ...this.props }
    }
}
