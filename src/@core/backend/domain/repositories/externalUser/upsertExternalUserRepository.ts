import { ExternalUser } from "@/@core/shared/entities/user/externalUser"
import { ExternalUserWithId } from "./protocols"

export interface UpsertExternalUserRepository {
    upsert(user: ExternalUser): Promise<ExternalUserWithId>
}
