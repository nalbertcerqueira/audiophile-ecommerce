"use client"

import { GoogleLoginButton } from "./components/GoogleLoginButton"
import { customZodResolver } from "@/libs/zod/resolvers"
import { AppleLoginButton } from "./components/AppleLoginButton"
import { AuthFormFields } from "./types/types"
import { signinUseCase } from "@/@core/frontend/main/usecases/auth/signinFactory"
import { loginSchema } from "./helpers/schemas"
import { AuthForm } from "./components/AuthForm"
import { Input } from "../shared/Input"
import { useForm, FieldErrors } from "react-hook-form"
import Link from "next/link"
import "./styles.scss"

export function LoginPageComponent() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm<AuthFormFields<"login">>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: customZodResolver(loginSchema)
    })

    const isFormBlocked = isSubmitting || isSubmitSuccessful

    async function handleSuccessfulSubmit(data: AuthFormFields<"login">) {
        if (isFormBlocked) return

        try {
            const token = await signinUseCase.execute(data)
            if (token) {
                localStorage.setItem("sessionToken", token)
                return setTimeout(() => location.reload(), 1000)
            }
            setError("password", { message: "Invalid email or password" })
        } catch (error: any) {
            console.log(error)
        }
    }

    async function handleFailedSubmit(errors: FieldErrors<AuthFormFields<"login">>) {
        if (!isFormBlocked) {
            console.log(errors)
        }
    }

    return (
        <div className="form-container">
            <h2 className="form-container__title">Sign-in</h2>
            <div className="form-container__third-party">
                <GoogleLoginButton isSubmitting={isFormBlocked}>
                    CONTINUE WITH GOOGLE
                </GoogleLoginButton>
                <AppleLoginButton isSubmitting={isFormBlocked}>
                    CONTINUE WITH APPLE
                </AppleLoginButton>
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
