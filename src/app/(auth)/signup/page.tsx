import { AuthRedirectionRoute } from "@/components/shared/AuthRedirectionRoute"
import { PageLoaderContainer } from "@/components/shared/loaders/PageLoaderContainer"
import { SignupPageComponent } from "@/components/auth/SignupPage"
import { BarLoader } from "@/components/shared/loaders/BarLoader"

export default function SignupPage() {
    return (
        <AuthRedirectionRoute
            routeType="auth"
            routeToRedirect="/"
            fallback={
                <PageLoaderContainer>
                    <BarLoader />
                </PageLoaderContainer>
            }
        >
            <SignupPageComponent />
        </AuthRedirectionRoute>
    )
}
