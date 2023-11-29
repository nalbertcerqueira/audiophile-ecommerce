"use client"

import { loginSchema } from "./helpers/schemas"
import { customZodResolver } from "@/libs/zod"
import { AuthFormFields } from "./types/types"
import { Input } from "../shared/Input"
import { useForm, FieldErrors } from "react-hook-form"
import { GoogleLoginButton } from "./components/GoogleLoginButton"
import { AppleLoginButton } from "./components/AppleLoginButton"
import { AuthForm } from "./components/AuthForm"
import "./styles.scss"

export const loginFormInitialState: AuthFormFields<"login"> = {
    email: "",
    password: ""
}

export function LoginPageComponent() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<AuthFormFields<"login">>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: loginFormInitialState,
        resolver: customZodResolver(loginSchema)
    })

    async function handleSuccessfulSubmit(data: AuthFormFields<"login">) {
        if (!isSubmitting) {
            console.log(data)
        }
    }

    async function handleFailedSubmit(errors: FieldErrors<AuthFormFields<"login">>) {
        if (!isSubmitting) {
            console.log(errors)
        }
    }

    return (
        <div className="form-container">
            <h2 className="form-container__title">Sign-in</h2>
            <div className="form-container__third-party">
                <GoogleLoginButton isSubmitting={isSubmitting}>
                    CONTINUE WITH GOOGLE
                </GoogleLoginButton>
                <AppleLoginButton isSubmitting={isSubmitting}>
                    CONTINUE WITH APPLE
                </AppleLoginButton>
            </div>
            <div className="form-container__division">Or</div>
            <AuthForm
                submitBtn="LOGIN"
                isSubmitting={isSubmitting}
                submitHandler={handleSubmit(handleSuccessfulSubmit, handleFailedSubmit)}
            >
                <Input
                    {...register("email")}
                    type="text"
                    autocomplete="email"
                    id="email"
                    label="Email Address"
                    placeholder="youremail@mail.com"
                    error={errors.email?.message}
                />
                <Input
                    {...register("password")}
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    id="password"
                    label="Password"
                    placeholder="* * * * * * * * * *"
                    error={errors.password?.message}
                />
            </AuthForm>
        </div>
    )
}
