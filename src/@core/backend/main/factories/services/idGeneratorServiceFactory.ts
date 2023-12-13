import { UuidGeneratorService } from "@/@core/backend/infra/services/uuidGeneratorService"

function createUuidGeneratorService() {
    return new UuidGeneratorService()
}

export const uuidGeneratorService = createUuidGeneratorService()
