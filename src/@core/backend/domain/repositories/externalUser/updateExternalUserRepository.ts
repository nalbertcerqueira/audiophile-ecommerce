import { ExternalUserProps } from "@/@core/shared/entities/user/externalUser"
import { ExternalUserWithId } from "./protocols"
export interface ExternalUserParams
    extends Partial<Omit<ExternalUserProps, "phone" | "profileImg">> {
    phone?: NonNullable<ExternalUserProps["phone"]>
    profileImg?: NonNullable<ExternalUserProps["profileImg"]>
}

export interface UpdateExternalUserRepository {
    update(id: string, props: ExternalUserParams): Promise<ExternalUserWithId | null>
}
