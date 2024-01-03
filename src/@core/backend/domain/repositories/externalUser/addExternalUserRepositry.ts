import { ExternalUser } from "@/@core/shared/entities/user/externalUser"
import { ExternalUserWithId } from "./protocols"

export interface AddExternalUserRepository {
    add(user: ExternalUser): Promise<ExternalUserWithId>
}
