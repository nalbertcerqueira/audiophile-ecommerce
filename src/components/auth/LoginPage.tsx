"use client"

import { loginSchema } from "./helpers/schemas"
import { customZodResolver } from "@/libs/zod"
import { AuthFormFields } from "./types/types"
import { Input } from "../shared/Input"
import { useForm, FieldErrors } from "react-hook-form"
import "./styles.scss"
import { GoogleLoginButton } from "./components/GoogleLoginButton"

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
            <h2 className="form-container__title">Login</h2>
            <form
                onSubmit={handleSubmit(handleSuccessfulSubmit, handleFailedSubmit)}
                className="auth-form"
            >
                <div className="auth-form__input-wrapper">
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
                        autocomplete="password"
                        id="password"
                        label="Password"
                        placeholder="* * * * * * * * * *"
                        error={errors.password?.message}
                    />
                </div>
                <div className="auth-form__btn-wrapper">
                    <button disabled={isSubmitting} className="btn btn--primary" type="submit">
                        LOGIN
                    </button>
                    <GoogleLoginButton isSubmitting={isSubmitting}>
                        Login with google
                    </GoogleLoginButton>
                </div>
            </form>
        </div>
    )
}
