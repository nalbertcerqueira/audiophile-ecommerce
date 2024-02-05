import { CheckoutPageComponent } from "@/components/checkout/CheckoutPage"
import { AuthRedirectionRoute } from "@/components/shared/AuthRedirectionRoute"
import { PageLoaderContainer } from "@/components/shared/loaders/PageLoaderContainer"
import { BarLoader } from "@/components/shared/loaders/BarLoader"

export default function CheckoutPage() {
    return (
        <AuthRedirectionRoute
            routeType="protected"
            routeToRedirect="/signin"
            fallback={
                <PageLoaderContainer>
                    <BarLoader />
                </PageLoaderContainer>
            }
        >
            <CheckoutPageComponent />
        </AuthRedirectionRoute>
    )
}
