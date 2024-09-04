import { ExternalUserWithId } from "./protocols"

export interface FindExternalUserByIdRepository {
    findById(userId: string): Promise<ExternalUserWithId | null>
}
