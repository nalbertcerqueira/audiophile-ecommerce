export interface AuthData {
    email: string
    password: string
}

export interface AuthenticationGateway {
    authenticateUser(authData: AuthData): Promise<string | null>
}
