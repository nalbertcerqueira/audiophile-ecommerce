import { UserProps } from "@/@core/shared/entities/user/user"

export type DbSigninInputDTO = Pick<UserProps, "email" | "password">

export interface AuthorizationOutputDTO extends Omit<UserProps, "password"> {
    readonly id: string
}
