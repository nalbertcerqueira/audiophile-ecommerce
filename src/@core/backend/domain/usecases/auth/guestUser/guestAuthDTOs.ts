export interface GuestSessionOutputDTO {
    id: string
    type: "guest"
    token: string
}

export type GuestAuthorizationOutputDTO = { id: string } | null
