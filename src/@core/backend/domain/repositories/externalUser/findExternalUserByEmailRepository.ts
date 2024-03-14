import { ExternalUserWithId } from "./protocols"

export interface FindExternalUserByEmailRepository {
    findByEmail(email: string): Promise<ExternalUserWithId | null>
}
