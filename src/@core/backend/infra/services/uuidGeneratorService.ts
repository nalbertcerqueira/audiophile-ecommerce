import { IdGeneratorService } from "../../domain/services/idGeneratorService"
import * as uuid from "uuid"

export class UuidGeneratorService implements IdGeneratorService {
    public generate(): string {
        const id = uuid.v4()

        return id
    }
}
