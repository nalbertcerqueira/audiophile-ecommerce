import { HashService } from "../../domain/services/crypto/hashService"
import { createHash } from "crypto"

export class ShaHashService implements HashService {
    constructor(private readonly algorithm: "sha1" | "sha256" | "sha512") {}

    public async hash(input: string): Promise<string> {
        return createHash(this.algorithm).update(input).digest("base64url")
    }
}
