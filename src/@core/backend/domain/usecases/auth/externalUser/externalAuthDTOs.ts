import { ExternalUserProps } from "@/@core/shared/entities/user/externalUser"

export interface ExternalSigninInputDTO extends Omit<ExternalUserProps, "images"> {
    image: string | null
}

export interface ExternalAuthorizationOutputDTO extends ExternalUserProps {
    id: string
}
