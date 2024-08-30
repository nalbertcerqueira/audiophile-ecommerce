import { UserProps } from "@/@core/shared/entities/user/user"

export type UpdatedUser = Omit<UserProps, "password"> & { id: string }

export interface UserParams
    extends Partial<Omit<UserProps, "email" | "phone" | "profileImg">> {
    phone?: NonNullable<UserProps["phone"]>
    profileImg?: NonNullable<UserProps["profileImg"]>
}

export interface UpdateUserRepository {
    update(id: string, props: UserParams): Promise<UpdatedUser | null>
}
