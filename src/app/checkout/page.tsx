import { CheckoutPageComponent } from "@/components/checkout/CheckoutPage"
import { AuthRedirectionRoute } from "@/components/shared/AuthRedirectionRoute"

import { Suspense } from "react"
import Loading from "./loading"

export default function CheckoutPage() {
    return (
        <Suspense fallback={<Loading />}>
            <AuthRedirectionRoute
                routeType="protected"
                routeToRedirect="/signin"
                fallback={<Loading />}
            >
                <CheckoutPageComponent />
            </AuthRedirectionRoute>
        </Suspense>
    )
}
