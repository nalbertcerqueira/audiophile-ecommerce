import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { UserDetails } from "../protocols"

export interface AddCheckoutOrderRepository {
    add(userDetails: UserDetails, order: CheckoutOrder): Promise<boolean>
}
