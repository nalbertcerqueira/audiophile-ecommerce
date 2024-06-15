import { UserInfo } from "../../protocols"
import { Customer } from "@/@core/shared/entities/order/checkoutOrder"

export interface CreateOrderInputDTO {
    user: UserInfo
    customer: Customer
}
