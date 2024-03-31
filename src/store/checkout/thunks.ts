import { createCheckoutOrderUseCase } from "@/@core/frontend/main/usecases/order/createCheckoutOrderFactory"
import { getOrderTaxesUseCase } from "@/@core/frontend/main/usecases/order/getOrderTaxesFactory"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Taxes } from "@/@core/shared/entities/order/checkoutOrder"
import { Order } from "./types"

export const fetchTaxes = createAsyncThunk<Taxes, void>("checkout/fetchTaxes", async () => {
    const taxes = await getOrderTaxesUseCase.execute()
    return taxes
})

export const createOrder = createAsyncThunk<Order, void>("checkout/createOrder", async () => {
    const order = await createCheckoutOrderUseCase.execute()
    const { orderId, cart } = order.toJSON()
    return { orderId, items: cart.items, grandTotal: order.getGrandTotal() }
})
