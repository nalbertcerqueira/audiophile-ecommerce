"use client"

import {
    CheckoutOrder,
    CheckoutOrderProps,
    Taxes
} from "@/@core/shared/entities/order/checkoutOrder"
import { createCheckoutOrderUseCase } from "@/@core/frontend/main/usecases/order/createCheckoutOrderFactory"
import { SuccessCheckoutMessage } from "@/libs/react-toastify/components/CheckoutMessages"
import { getOrderTaxesUseCase } from "@/@core/frontend/main/usecases/order/getOrderTaxesFactory"
import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { emitToast } from "@/libs/react-toastify/utils"

import { PropsWithChildren, createContext, useState, SetStateAction, useEffect } from "react"
import { Id } from "react-toastify"

interface CheckoutStatus {
    isLoadingTaxes: boolean
    isCheckingOut: boolean
}

interface Order extends Pick<CheckoutOrderProps, "orderId"> {
    cartItems: CartProduct[]
    grandTotal: number
}

interface CheckoutContextProps {
    taxes: Taxes
    order: Order | null
    checkoutStatus: CheckoutStatus
    updateTaxes: () => Promise<void>
    createOrder: (withToast?: boolean) => Promise<void>
    setCheckoutStatus: (
        state: SetStateAction<CheckoutStatus>,
        delay?: number
    ) => NodeJS.Timeout | void
}

const taxesInitialState: Taxes = { vat: 0, shipping: 0 }

export const CheckoutContext = createContext({} as CheckoutContextProps)

export function CheckoutProvider({ children }: PropsWithChildren) {
    // const sessionState = useContext(SessionContext)
    const [taxes, setTaxes] = useState<Taxes>(taxesInitialState)
    const [order, setOrder] = useState<Order | null>(null)
    const [status, setStatus] = useState<CheckoutStatus>({
        isLoadingTaxes: true,
        isCheckingOut: false
    })

    //Buscando as taxas do carrinho após o carregamento da página
    useEffect(() => {
        setStatus({ isCheckingOut: false, isLoadingTaxes: true })
        getOrderTaxesUseCase
            .execute()
            .then((taxes) => setTaxes(taxes))
            .catch((error: Error) => {
                error.name === "UnauthorizedError"
                    ? setTaxes(taxesInitialState)
                    : emitToast("error", error.message)
            })
            .finally(() => setStatus((prevState) => ({ ...prevState, isLoadingTaxes: false })))
    }, [])

    async function updateTaxes() {
        await getOrderTaxesUseCase
            .execute()
            .then((data) => setTaxes(data))
            .catch((error: Error) => handleErrors(error, "taxes"))
    }

    async function createOrder(withToast?: boolean) {
        let toastId: Id | undefined

        if (withToast) {
            toastId = emitToast("loading", "Processing your order. Please wait a moment...")
        }

        setStatus((prevState) => ({ ...prevState, isCheckingOut: true }))
        await createCheckoutOrderUseCase
            .execute()
            .then((order) => handleCheckout(order, toastId))
            .catch((error) => handleErrors(error, "order", toastId))
            .finally(() => setStatus((prevState) => ({ ...prevState, isCheckingOut: false })))
    }

    function setCheckoutStatus(
        state: SetStateAction<CheckoutStatus>,
        delay?: number
    ): NodeJS.Timeout | void {
        if (delay) {
            const timerRef = setTimeout(() => setStatus(state), delay)
            return timerRef
        }

        return setStatus(state)
    }

    function handleCheckout(order: CheckoutOrder, toastId?: Id) {
        const { orderId, cart } = order.toJSON()

        if (toastId) {
            const successMsg = SuccessCheckoutMessage(orderId)
            emitToast("success", successMsg, { id: toastId, update: true })
        }

        setOrder({
            orderId,
            cartItems: cart.items,
            grandTotal: order.getGrandTotal()
        })
    }

    function handleErrors(error: Error, requestType: "order" | "taxes", toastId?: Id) {
        requestType === "order" && setOrder(null)

        if (error.name === "UnauthorizedError") {
            return location.reload()
        }

        toastId
            ? emitToast("error", error.message, { id: toastId, update: true })
            : emitToast("error", error.message)
    }

    return (
        <CheckoutContext.Provider
            value={{
                taxes,
                order,
                checkoutStatus: status,
                setCheckoutStatus,
                updateTaxes,
                createOrder
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}
