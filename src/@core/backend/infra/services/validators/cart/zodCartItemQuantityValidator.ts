import {
    SchemaValidatorService,
    ValidationResult
} from "@/@core/backend/domain/services/schemaValidator"
import { generateCustomZodErrors } from "@/@core/shared/entities/helpers"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { ZodSchema, object as zodObject, number as zodNumber } from "zod"

type QuantitySchema = Pick<CartProduct, "quantity">

export class ZodCartItemQuantityValidator implements SchemaValidatorService {
    private readonly quantitySchema: ZodSchema<QuantitySchema>

    constructor() {
        this.quantitySchema = zodObject({ quantity: zodNumber().int().gte(0).finite() })
    }

    public async validate(data: any): Promise<ValidationResult> {
        const validationResult = this.quantitySchema.safeParse(data)

        if (!validationResult.success) {
            return {
                isValid: false,
                errors: generateCustomZodErrors(validationResult.error, 1)
            }
        }

        return { isValid: true, data: validationResult.data }
    }
}
