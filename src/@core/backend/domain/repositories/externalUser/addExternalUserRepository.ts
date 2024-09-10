import { ExternalUser } from "@/@core/shared/entities/user/externalUser"

export interface AddExternalUserRepository {
    add(user: ExternalUser): Promise<{ id: string }>
}
