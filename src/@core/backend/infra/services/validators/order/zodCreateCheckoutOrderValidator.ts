import {
    SchemaValidatorService,
    ValidationResult
} from "@/@core/backend/domain/services/schemaValidator"
import { generateCustomZodErrors } from "@/@core/shared/entities/helpers"
import { CheckoutOrderProps } from "@/@core/shared/entities/order/checkoutOrder"
import { zodCheckoutOrderSchema } from "@/@core/shared/entities/order/utils"
import { ZodSchema } from "zod"

type CreateCheckoutOrderSchema = Pick<CheckoutOrderProps, "cartItems" | "costumer">

export class ZodCreateCheckoutOrderValidator implements SchemaValidatorService {
    private readonly checkoutOrderSchema: ZodSchema<CreateCheckoutOrderSchema>

    constructor() {
        this.checkoutOrderSchema = zodCheckoutOrderSchema.pick({
            cartItems: true,
            costumer: true
        })
    }

    public async validate(data: any): Promise<ValidationResult> {
        const validationResult = this.checkoutOrderSchema.safeParse(data)

        if (!validationResult.success) {
            return {
                isValid: false,
                errors: generateCustomZodErrors(validationResult.error, 1)
            }
        }

        return { isValid: true, data: validationResult.data }
    }
}
