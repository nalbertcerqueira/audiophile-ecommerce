import { BcryptEncrypterService } from "@/@core/backend/infra/services/bcryptEncrypterService"

function createBcryptEncrypterService(saltRounds: number) {
    return new BcryptEncrypterService(saltRounds)
}

export const bcryptEncrypterService = createBcryptEncrypterService(12)
