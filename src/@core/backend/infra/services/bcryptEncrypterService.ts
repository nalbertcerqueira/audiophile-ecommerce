import { HashService } from "../../domain/services/hashService"
import bcrypt from "bcrypt"

export class BcryptEncrypterService implements HashService {
    constructor(private readonly saltRounds: number) {}

    public async hash(input: string): Promise<string> {
        const hashedInput = await bcrypt.hash(input, this.saltRounds)
        return hashedInput
    }
}
