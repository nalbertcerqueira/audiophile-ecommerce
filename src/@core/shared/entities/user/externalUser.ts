import { externalUserZodSchema } from "./utils"
import { UserProps } from "./user"
import { Entity } from "../helpers"

export type ExternalUserProps = Omit<UserProps, "password">

//Entidade que representa um usuário que se autenticou através de um servidor
//de autenticação de terceiros, como google ou github por exemplo.
export class ExternalUser extends Entity<ExternalUserProps> {
    private props: ExternalUserProps
    private externalUserSchema = externalUserZodSchema

    constructor(props: ExternalUserProps) {
        super()
        const validation = this.validate(props, this.externalUserSchema)

        if (!validation.success) {
            const firstError = validation.errors[0]
            throw new Error(firstError)
        }

        const { data } = validation
        this.props = { ...data }
    }

    public toJSON(): ExternalUserProps {
        return {
            ...this.props
        }
    }
}
