import { ExternalUserProps } from "@/@core/shared/entities/user/externalUser"

export interface ExternalSigninInputDTO
    extends Omit<ExternalUserProps, "profileImg" | "phone"> {
    image: string | null
}

export interface ExternalAuthorizationOutputDTO extends ExternalUserProps {
    id: string
}
