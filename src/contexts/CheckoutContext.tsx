"use client"

import { createCheckoutOrderUseCase } from "@/@core/frontend/main/usecases/order/createCheckoutOrderFactory"
import { SuccessCheckoutMessage } from "@/libs/react-toastify/components/CheckoutMessages"
import { getOrderTaxesUseCase } from "@/@core/frontend/main/usecases/order/getOrderTaxesFactory"
import { SessionContext } from "./SessionContext"
import { emitToast } from "@/libs/react-toastify/utils"
import {
    CheckoutOrder,
    CheckoutOrderProps,
    Taxes
} from "@/@core/shared/entities/order/checkoutOrder"
import {
    PropsWithChildren,
    createContext,
    useState,
    SetStateAction,
    useCallback,
    useEffect,
    useContext
} from "react"
import { Id } from "react-toastify"

interface CheckoutStatus {
    isLoadingTaxes: boolean
    isCheckingOut: boolean
}

interface Order extends Pick<CheckoutOrderProps, "cartItems" | "orderId"> {
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

export const CheckoutContext = createContext({} as CheckoutContextProps)

export function CheckoutProvider({ children }: PropsWithChildren) {
    const sessionState = useContext(SessionContext)
    const [taxes, setTaxes] = useState<Taxes>({ vat: 0, shipping: 0 })
    const [order, setOrder] = useState<Order | null>(null)
    const [status, setStatus] = useState<CheckoutStatus>({
        isLoadingTaxes: true,
        isCheckingOut: false
    })

    const updateTaxes = useCallback(async () => {
        await getOrderTaxesUseCase
            .execute()
            .then((data) => setTaxes(data))
            .catch((error) => handleErrors(error, "taxes"))
    }, [])

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
        const { orderId, cartItems } = order.toJSON()

        if (toastId) {
            const successMsg = SuccessCheckoutMessage(orderId)
            emitToast("success", successMsg, { id: toastId, update: true })
        }

        setOrder({
            orderId,
            cartItems,
            grandTotal: order.calculateGrandTotal()
        })
    }

    function handleErrors(error: Error, requestType: "order" | "taxes", toastId?: Id) {
        requestType === "order" && setOrder(null)

        if (error.name === "UnauthorizedError") {
            return location.reload()
        }

        if (toastId) {
            return emitToast("error", error.message, { id: toastId, update: true })
        } else {
            return emitToast("error", error.message)
        }
    }

    //Buscando as taxas do carrinho após a sessão ser validada
    useEffect(() => {
        if (!sessionState.isLoading) {
            updateTaxes().then(() => {
                setStatus((prevState) => ({ ...prevState, isLoadingTaxes: false }))
            })
        }
    }, [updateTaxes, sessionState.isLoading])

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
