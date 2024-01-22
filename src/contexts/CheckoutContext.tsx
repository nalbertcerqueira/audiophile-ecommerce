"use client"

import { getOrderTaxesUseCase } from "@/@core/frontend/main/usecases/order/getOrderTaxesFactory"
import { Taxes } from "@/@core/shared/entities/order/checkoutOrder"
import {
    PropsWithChildren,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useCallback
} from "react"

interface CheckoutStatus {
    isLoadingTaxes: boolean
    isCheckingOut: boolean
}

interface CheckoutContextProps {
    status: CheckoutStatus
    taxes: Taxes
    updateTaxes: () => void
    updateStatus: Dispatch<SetStateAction<CheckoutStatus>>
}

export const CheckoutContext = createContext({} as CheckoutContextProps)

export function CheckoutProvider({ children }: PropsWithChildren) {
    const [taxes, setTaxes] = useState<Taxes>({ vat: 0, shipping: 0 })
    const [status, setStatus] = useState<CheckoutStatus>({
        isLoadingTaxes: false,
        isCheckingOut: false
    })

    const updateTaxes = useCallback(() => {
        setStatus((prevState) => ({ ...prevState, isLoadingTaxes: true }))
        getOrderTaxesUseCase
            .execute()
            .then((data) => setTaxes(data))
            .catch((error) => console.log(error))
            .finally(() => setStatus((prevState) => ({ ...prevState, isLoadingTaxes: false })))
    }, [])

    return (
        <CheckoutContext.Provider
            value={{
                status: status,
                taxes: taxes,
                updateTaxes,
                updateStatus: setStatus
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}
