import {
    SchemaValidatorService,
    ValidationResult
} from "../../domain/services/schemaValidator"
import { ZodSchema } from "zod"
import { ZodHelper } from "@/@core/shared/entities/helpers"

export class ZodSchemaValidator implements SchemaValidatorService {
    constructor(private readonly schema: ZodSchema) {}

    public async validate(data: any): Promise<ValidationResult> {
        const validationResult = this.schema.safeParse(data)

        if (!validationResult.success) {
            return {
                isValid: false,
                errors: ZodHelper.generateCustomZodErrors(validationResult.error, 1)
            }
        }

        return { isValid: true, data: validationResult.data }
    }
}
