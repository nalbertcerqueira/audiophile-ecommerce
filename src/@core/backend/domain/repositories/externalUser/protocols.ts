import { ExternalUserProps } from "@/@core/shared/entities/user/externalUser"

export interface ExternalUserWithId extends ExternalUserProps {
    readonly id: string
}
