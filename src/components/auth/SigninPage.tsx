"use client"

import { BuiltInProviderType } from "next-auth/providers/index"
import { SocialSigninButton } from "./components/SocialSigninButton"
import { AuthFormFields } from "./types/types"
import { signinUseCase } from "@/@core/frontend/main/usecases/auth/signinFactory"
import { PasswordInput } from "../shared/inputs/PasswordInput"
import { GoogleIcon } from "../shared/icons/GoogleIcon"
import { GithubIcon } from "../shared/icons/GithubIcon"
import { emitToast } from "@/libs/react-toastify/utils"
import { AuthForm } from "./components/AuthForm"
import { Input } from "../shared/inputs/Input"
import { signIn } from "next-auth/react"
import { useAuthForm } from "./helpers/useAuthForm"
import { useState } from "react"
import Link from "next/link"
import "./styles.scss"

export function SigninPageComponent() {
    const form = useAuthForm("signin")
    const [isExternalProvider, setIsExternalProvider] = useState(false)
    const isFormBlocked = form.isSubmitting || form.isSubmitSuccessful || isExternalProvider

    function handleSignin(accessToken: string | null) {
        if (!accessToken) {
            return form.setError("password", { message: "Invalid email or password" })
        }

        localStorage.setItem("accessToken", accessToken)
        emitToast("success", "You've successfully logged in!")
        return setTimeout(() => location.reload(), 1000)
    }

    async function externalSignin(provider: BuiltInProviderType) {
        if (isFormBlocked) return

        setIsExternalProvider(true)

        const oneDay = 1000 * 3600 * 24
        const expirationDate = new Date(Date.now() + oneDay).toUTCString()
        const guestAccessToken = localStorage.getItem("accessToken")

        //Passando o accessToken do usuário convidado para um cookie, o qual será enviado
        //na requisição do next-auth, e posteriormente capturado pelo handler da api.
        document.cookie = `guest-access-token=${guestAccessToken};path=/;expires=${expirationDate};sameSite=Lax`

        return signIn(provider, { callbackUrl: "/" })
    }

    async function handleSuccessfulSubmit(data: AuthFormFields<"signin">) {
        if (isFormBlocked) return

        return signinUseCase
            .execute(data)
            .then((token) => handleSignin(token))
            .catch((error) => emitToast("error", error.message))
    }

    return (
        <div className="form-container">
            <h2 className="form-container__title">Sign-in</h2>
            <div className="form-container__third-party">
                <SocialSigninButton
                    provider="google"
                    onClick={() => externalSignin("google")}
                    isSubmitting={isFormBlocked}
                >
                    <GoogleIcon className="third-party-btn__icon" />
                    CONTINUE WITH GOOGLE
                </SocialSigninButton>
                <SocialSigninButton
                    provider="github"
                    onClick={() => externalSignin("github")}
                    isSubmitting={isFormBlocked}
                >
                    <GithubIcon className="third-party-btn__icon" />
                    CONTINUE WITH GITHUB
                </SocialSigninButton>
            </div>
            <div className="form-container__separator">Or</div>
            <AuthForm
                ariaLabel={"signin with your own credentials"}
                submitBtn="LOGIN"
                isSubmitting={isFormBlocked}
                onSubmit={form.handleSubmit(handleSuccessfulSubmit)}
            >
                <Input
                    {...form.register("email")}
                    disabled={isFormBlocked}
                    type="text"
                    autocomplete="email"
                    id="email"
                    label="Email Address"
                    placeholder="youremail@mail.com"
                    error={form.errors.email?.message}
                />
                <PasswordInput
                    {...form.register("password")}
                    disabled={isFormBlocked}
                    name="password"
                    autocomplete="new-password"
                    id="password"
                    label="Password"
                    error={form.errors.password?.message}
                />
            </AuthForm>
            <div className="form-container__alt-page">
                <span>Don&apos;t have a account?</span>{" "}
                <Link className="form-container__signup-link" href="/signup">
                    Sign up here
                </Link>
            </div>
        </div>
    )
}
