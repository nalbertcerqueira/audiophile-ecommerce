import {
    SchemaValidatorService,
    ValidationResult
} from "@/@core/backend/domain/services/schemaValidator"
import { generateCustomZodErrors } from "@/@core/shared/entities/helpers"
import { userZodSchema } from "@/@core/shared/entities/user/utils"
import { UserProps } from "@/@core/shared/entities/user/user"
import { ZodSchema } from "zod"

type SigninSchema = Pick<UserProps, "email" | "password">

export class ZodSigninValidator implements SchemaValidatorService {
    private readonly signinSchema: ZodSchema<SigninSchema>

    constructor() {
        this.signinSchema = userZodSchema.pick({ email: true, password: true })
    }

    public async validate(data: any): Promise<ValidationResult> {
        const validationResult = this.signinSchema.safeParse(data)

        if (!validationResult.success) {
            return {
                isValid: false,
                errors: generateCustomZodErrors(validationResult.error, 1)
            }
        }

        return {
            isValid: true,
            data: validationResult.data
        }
    }
}
