import { UserProps } from "@/@core/shared/entities/user/user"

export type AddUserInputDTO = Omit<UserProps, "images">
