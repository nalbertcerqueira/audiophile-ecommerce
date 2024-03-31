"use client"

import { AppStore, makeStore } from "@/store/store"
import { PropsWithChildren, useRef } from "react"
import { Provider } from "react-redux"

export function StoreProvider({ children }: PropsWithChildren) {
    const storeRef = useRef<AppStore>()

    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
