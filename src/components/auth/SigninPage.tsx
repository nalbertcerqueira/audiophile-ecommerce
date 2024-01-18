"use client"

import { BuiltInProviderType } from "next-auth/providers/index"
import { GithubIcon } from "../shared/icons/GithubIcon"
import { SocialSigninButton } from "./components/SocialSigninButton"
import { customZodResolver } from "@/libs/zod/resolvers"
import { AuthFormFields } from "./types/types"
import { signinUseCase } from "@/@core/frontend/main/usecases/auth/signinFactory"
import { signinSchema } from "./helpers/schemas"
import { GoogleIcon } from "../shared/icons/GoogleIcon"
import { emitToast } from "@/libs/react-toastify/utils"
import { AuthForm } from "./components/AuthForm"
import { Input } from "../shared/Input"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import "./styles.scss"

export function SigninPageComponent() {
    const [isFormBlocked, setIsFormBlocked] = useState(false)
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm<AuthFormFields<"signin">>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: customZodResolver(signinSchema)
    })

    useEffect(
        () => setIsFormBlocked(isSubmitting || isSubmitSuccessful),
        [isSubmitting, isSubmitSuccessful]
    )

    function handleSignin(accessToken: string | null) {
        if (!accessToken) {
            return setError("password", { message: "Invalid email or password" })
        }

        localStorage.setItem("accessToken", accessToken)
        emitToast("success", "You've successfully logged in!")
        return setTimeout(() => location.reload(), 1000)
    }

    async function externalSignin(provider: BuiltInProviderType) {
        setIsFormBlocked(true)
        const oneDay = 1000 * 3600 * 24
        const expirationDate = new Date(Date.now() + oneDay).toUTCString()
        const guestAccessToken = localStorage.getItem("accessToken")
        document.cookie = `guest-access-token=${guestAccessToken};path=/;expires=${expirationDate};sameSite=Lax`
        await signIn(provider, { callbackUrl: "/" })
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
            <div className="form-container__division">Or</div>
            <AuthForm
                submitBtn="LOGIN"
                isSubmitting={isFormBlocked}
                submitHandler={handleSubmit(handleSuccessfulSubmit)}
            >
                <Input
                    {...register("email")}
                    disabled={isFormBlocked}
                    type="text"
                    autocomplete="email"
                    id="email"
                    label="Email Address"
                    placeholder="youremail@mail.com"
                    error={errors.email?.message}
                />
                <Input
                    {...register("password")}
                    disabled={isFormBlocked}
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    id="password"
                    label="Password"
                    placeholder="* * * * * * * * * *"
                    error={errors.password?.message}
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
