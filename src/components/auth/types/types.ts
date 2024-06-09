import { UserProps } from "@/@core/shared/entities/user/user"

export type AuthFormFields<T extends "signin" | "signup"> = T extends "signin"
    ? SigninFields
    : SignupFields

export interface SigninFields extends Pick<UserProps, "email" | "password"> {}

export interface SignupFields extends Omit<UserProps, "images"> {
    passwordConfirmation: string
}
