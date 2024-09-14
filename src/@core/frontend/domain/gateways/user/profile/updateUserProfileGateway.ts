import { DefaultUser } from "./protocols"
import { UserProps } from "@/@core/shared/entities/user/user"

export interface ProfileParams
    extends Partial<Omit<UserProps, "email" | "phone" | "profileImg" | "password">> {
    phone?: NonNullable<UserProps["phone"]>
    profileImg?: File
}

export interface UpdateUserProfileGateway {
    update(data: ProfileParams): Promise<DefaultUser>
}
