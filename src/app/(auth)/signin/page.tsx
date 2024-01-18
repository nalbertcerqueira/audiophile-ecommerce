import { AuthRedirectionRoute } from "@/components/shared/AuthRedirectionRoute"
import { PageLoaderContainer } from "@/components/shared/loaders/PageLoaderContainer"
import { SigninPageComponent } from "@/components/auth/SigninPage"
import { BarLoader } from "@/components/shared/loaders/BarLoader"

export default function SigninPage() {
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
            <SigninPageComponent />
        </AuthRedirectionRoute>
    )
}
