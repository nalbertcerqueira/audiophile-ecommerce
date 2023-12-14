import { HashComparerService } from "../../domain/services/crypto/hashComparerService"
import { HashService } from "../../domain/services/crypto/hashService"
import bcrypt from "bcrypt"

export class BcryptEncrypterService implements HashService, HashComparerService {
    constructor(private readonly saltRounds: number) {}

    public async hash(input: string): Promise<string> {
        const hashedInput = await bcrypt.hash(input, this.saltRounds)
        return hashedInput
    }

    public async compare(input: string, hash: string): Promise<boolean> {
        try {
            const result = await bcrypt.compare(input, hash)
            return result
        } catch {
            return false
        }
    }
}
