import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { UserInfo } from "../../usecases/protocols"

export interface AddCheckoutOrderRepository {
    add(user: UserInfo, order: CheckoutOrder): Promise<boolean>
}
