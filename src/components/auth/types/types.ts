import { UserProps } from "@/@core/shared/entities/user/user"

export type AuthFormFields<T extends "login" | "signup"> = T extends "login"
    ? LoginFields
    : SignupFields

export interface LoginFields extends Pick<UserProps, "email" | "password"> {}

export interface SignupFields extends Pick<UserProps, "name" | "email" | "password"> {
    passwordConfirmation: string
}
