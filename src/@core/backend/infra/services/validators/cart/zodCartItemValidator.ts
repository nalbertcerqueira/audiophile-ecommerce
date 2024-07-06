import {
    SchemaValidatorService,
    ValidationResult
} from "@/@core/backend/domain/services/schemaValidator"
import { generateCustomZodErrors } from "@/@core/shared/entities/helpers"
import { cartItemZodSchema } from "@/@core/shared/entities/cart/utils"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { ZodSchema } from "zod"

type CartItemSchema = Pick<CartProduct, "productId" | "quantity">

export class ZodCartItemValidator implements SchemaValidatorService {
    private readonly cartItemSchema: ZodSchema<CartItemSchema>

    constructor() {
        this.cartItemSchema = cartItemZodSchema.pick({ productId: true, quantity: true })
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
