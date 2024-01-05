import { ExternalUser } from "@/@core/shared/entities/user/externalUser"

export interface FindExternalUserByIdRepository {
    findById(userId: string): Promise<ExternalUser | null>
}
