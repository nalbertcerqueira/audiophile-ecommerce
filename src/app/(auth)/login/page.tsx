import { AuthRedirectionRoute } from "@/components/shared/AuthRedirectionRoute"
import { PageLoaderContainer } from "@/components/shared/loaders/PageLoaderContainer"
import { LoginPageComponent } from "@/components/auth/LoginPage"
import { BarLoader } from "@/components/shared/loaders/BarLoader"

export default function LoginPage() {
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
            <LoginPageComponent />
        </AuthRedirectionRoute>
    )
}
