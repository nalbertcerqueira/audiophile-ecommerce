import { UserProps, UserType } from "@/@core/shared/entities/user/user"

export type AddUserInputDTO = Omit<UserProps, "profileImg" | "phone">

export type UpdateUserOutputDTO =
    | (Omit<UserProps, "password"> & { id: string; type: UserType })
    | null

export interface UpdateUserInputDTO
    extends Partial<Omit<UserProps, "email" | "profileImg" | "phone">> {
    id: string
    type: UserType
    phone?: NonNullable<UserProps["phone"]>
    profileImg?: File
}
