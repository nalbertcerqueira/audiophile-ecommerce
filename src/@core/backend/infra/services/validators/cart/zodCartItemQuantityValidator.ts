import {
    SchemaValidatorService,
    ValidationResult
} from "@/@core/backend/domain/services/schemaValidator"
import { generateCustomZodErrors } from "@/@core/shared/entities/helpers"
import { CartProduct, Cart } from "@/@core/shared/entities/cart/cart"
import { ZodSchema } from "zod"

type QuantitySchema = Pick<CartProduct, "quantity">

export class ZodCartItemQuantityValidator implements SchemaValidatorService {
    private readonly quantitySchema: ZodSchema<QuantitySchema>

    constructor() {
        this.quantitySchema = Cart.itemSchema.pick({ quantity: true })
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
