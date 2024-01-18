import {
    SchemaValidatorService,
    ValidationResult
} from "@/@core/backend/domain/services/schemaValidator"
import { CartProduct, Cart } from "@/@core/shared/entities/cart/cart"
import { generateCustomZodErrors } from "@/@core/shared/entities/helpers"
import { ZodSchema } from "zod"

type CartItemSchema = Pick<CartProduct, "productId" | "quantity">

export class ZodCartItemValidator implements SchemaValidatorService {
    private readonly cartItemSchema: ZodSchema<CartItemSchema>

    constructor() {
        this.cartItemSchema = Cart.itemSchema.pick({ productId: true, quantity: true })
    }

    public async validate(data: any): Promise<ValidationResult> {
        const validationResult = this.cartItemSchema.safeParse(data)

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
