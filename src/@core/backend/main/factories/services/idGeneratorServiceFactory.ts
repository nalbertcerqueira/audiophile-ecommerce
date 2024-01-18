import { UuidGeneratorService } from "@/@core/backend/infra/services/uuidGeneratorService"

function createUuidGeneratorService(): UuidGeneratorService {
    return new UuidGeneratorService()
}

export const uuidGeneratorService = createUuidGeneratorService()
