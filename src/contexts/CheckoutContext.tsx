"use client"

import { getOrderTaxesUseCase } from "@/@core/frontend/main/usecases/order/getOrderTaxesFactory"
import { CheckoutOrderProps, Taxes } from "@/@core/shared/entities/order/checkoutOrder"
import { SessionContext } from "./SessionContext"
import {
    PropsWithChildren,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useContext
} from "react"

interface CheckoutStatus {
    isLoadingTaxes: boolean
    isCheckingOut: boolean
}

interface Order extends Pick<CheckoutOrderProps, "cartItems" | "orderId"> {
    grandTotal: number
}

interface CheckoutContextProps {
    status: CheckoutStatus
    taxes: Taxes
    order: Order | null
    updateTaxes: () => Promise<void>
    updateOrder: Dispatch<SetStateAction<Order | null>>
    updateCheckoutStatus: (
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
        return getOrderTaxesUseCase
            .execute()
            .then((data) => setTaxes(data))
            .catch((error) => console.log(error))
    }, [])

    function updateCheckoutStatus(
        state: SetStateAction<CheckoutStatus>,
        delay?: number
    ): NodeJS.Timeout | void {
        if (delay) {
            const timerRef = setTimeout(() => setStatus(state), delay)
            return timerRef
        }

        return setStatus(state)
    }

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
                status,
                taxes,
                order,
                updateTaxes,
                updateCheckoutStatus,
                updateOrder: setOrder
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}
