import {
    SchemaValidatorService,
    ValidationResult
} from "@/@core/backend/domain/services/schemaValidator"
import { generateCustomZodErrors } from "@/@core/shared/entities/helpers"
import { passwordZodSchema } from "@/@core/shared/entities/user/utils"
import { userZodSchema } from "@/@core/shared/entities/user/utils"
import { UserProps } from "@/@core/shared/entities/user/user"
import { ZodSchema } from "zod"

interface SignupSchema extends Omit<UserProps, "images"> {
    passwordConfirmation: string
}
export class ZodSignupValidator implements SchemaValidatorService {
    private readonly signupSchema: ZodSchema<SignupSchema>

    constructor() {
        this.signupSchema = userZodSchema
            .pick({ firstName: true, lastName: true, email: true, password: true })
            .extend({ passwordConfirmation: passwordZodSchema })
            .refine((data) => data.password === data.passwordConfirmation, {
                message: "Passwords don't match",
                path: ["passwordConfirmation"]
            })
    }

    public async validate(data: any): Promise<ValidationResult> {
        const validationResult = this.signupSchema.safeParse(data)

        if (!validationResult.success) {
            const zodErrors = generateCustomZodErrors(validationResult.error, 1)
            return { isValid: false, errors: zodErrors }
        }

        return { isValid: true, data: validationResult.data }
    }
}
