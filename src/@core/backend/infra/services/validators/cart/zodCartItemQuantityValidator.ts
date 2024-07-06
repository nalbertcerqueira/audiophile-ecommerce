import {
    SchemaValidatorService,
    ValidationResult
} from "@/@core/backend/domain/services/schemaValidator"
import { generateCustomZodErrors } from "@/@core/shared/entities/helpers"
import { cartItemZodSchema } from "@/@core/shared/entities/cart/utils"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { ZodSchema } from "zod"

type QuantitySchema = Pick<CartProduct, "quantity">

export class ZodCartItemQuantityValidator implements SchemaValidatorService {
    private readonly quantitySchema: ZodSchema<QuantitySchema>

    constructor() {
        this.quantitySchema = cartItemZodSchema.pick({ quantity: true })
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
