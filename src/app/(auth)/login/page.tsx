import { LoginPageComponent } from "@/components/auth/LoginPage"
import { AuthRedirectionRoute } from "@/components/shared/AuthRedirectionRoute"

export default function LoginPage() {
    return (
        <AuthRedirectionRoute routeType="auth" routeToRedirect="/" fallback={null}>
            <LoginPageComponent />
        </AuthRedirectionRoute>
    )
}
