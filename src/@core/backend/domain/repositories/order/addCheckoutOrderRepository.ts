import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { UserType } from "@/@core/shared/entities/user/user"

export interface AddCheckoutOrderRepository {
    add(userId: string, userType: UserType, order: CheckoutOrder): Promise<boolean>
}
