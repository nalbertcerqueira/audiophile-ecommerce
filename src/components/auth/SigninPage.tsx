"use client"

import { GoogleSigninButton } from "./components/GoogleSigninButton"
import { customZodResolver } from "@/libs/zod/resolvers"
import { AppleSigninButton } from "./components/AppleSigninButton"
import { AuthFormFields } from "./types/types"
import { signinUseCase } from "@/@core/frontend/main/usecases/auth/signinFactory"
import { signinSchema } from "./helpers/schemas"
import { AuthForm } from "./components/AuthForm"
import { Input } from "../shared/Input"
import { useForm, FieldErrors } from "react-hook-form"
import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import "./styles.scss"
import { emitToast } from "@/libs/react-toastify/utils"

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

    async function handleSuccessfulSubmit(data: AuthFormFields<"signin">) {
        if (isFormBlocked) return

        try {
            const token = await signinUseCase.execute(data)
            if (token) {
                localStorage.setItem("sessionToken", token)
                emitToast("success", "You've successfully logged in!")
                return setTimeout(() => location.reload(), 1000)
            } else {
                return setError("password", { message: "Invalid email or password" })
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    async function handleFailedSubmit(errors: FieldErrors<AuthFormFields<"signin">>) {
        if (!isFormBlocked) {
            console.log(errors)
        }
    }

    async function externalSignin() {
        setIsFormBlocked(true)
        const oneDay = 1000 * 3600 * 24
        const expirationDate = new Date(Date.now() + oneDay).toUTCString()
        const guestAccessToken = localStorage.getItem("sessionToken")
        document.cookie = `guest-access-token=${guestAccessToken};path=/;expires=${expirationDate};sameSite=Lax`
        await signIn("google", { callbackUrl: "/" })
    }

    return (
        <div className="form-container">
            <h2 className="form-container__title">Sign-in</h2>
            <div className="form-container__third-party">
                <GoogleSigninButton onClick={externalSignin} isSubmitting={isFormBlocked}>
                    CONTINUE WITH GOOGLE
                </GoogleSigninButton>
                <AppleSigninButton isSubmitting={isFormBlocked}>
                    CONTINUE WITH APPLE
                </AppleSigninButton>
            </div>
            <div className="form-container__division">Or</div>
            <AuthForm
                submitBtn="LOGIN"
                isSubmitting={isFormBlocked}
                submitHandler={handleSubmit(handleSuccessfulSubmit, handleFailedSubmit)}
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
