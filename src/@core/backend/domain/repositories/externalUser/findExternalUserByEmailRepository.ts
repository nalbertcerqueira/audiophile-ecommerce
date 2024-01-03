import { ExternalUserProps } from "@/@core/shared/entities/user/externalUser"

export interface ExternalUserWithId extends ExternalUserProps {
    readonly id: string
}

export interface FindExternalUserByEmailRepository {
    findByEmail(email: string): Promise<ExternalUserWithId | null>
}
