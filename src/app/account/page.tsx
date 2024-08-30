import { AccountPageComponent } from "@/components/account/AccountPage"
import { AuthRedirectionRoute } from "@/components/shared/AuthRedirectionRoute"
import { Suspense } from "react"
import Loading from "./loading"

export default function AccountPage() {
    return (
        <Suspense fallback={<Loading />}>
            <AuthRedirectionRoute
                routeType="protected"
                routeToRedirect="/signin"
                fallback={<Loading />}
            >
                <AccountPageComponent />
            </AuthRedirectionRoute>
        </Suspense>
    )
}
