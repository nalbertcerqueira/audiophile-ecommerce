import { SignupPageComponent } from "@/components/auth/SignupPage"
import { AuthRedirectionRoute } from "@/components/shared/AuthRedirectionRoute"

export default function SignupPage() {
    return (
        <AuthRedirectionRoute routeType="auth" routeToRedirect="/" fallback={null}>
            <SignupPageComponent />
        </AuthRedirectionRoute>
    )
}
