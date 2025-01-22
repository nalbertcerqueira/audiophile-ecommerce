"use client"

import { AuthFormFields } from "./types/types"
import { signupUseCase } from "@/@core/frontend/main/usecases/auth/signupFactory"
import { PasswordInput } from "../shared/inputs/PasswordInput"
import { useAuthForm } from "./helpers/useAuthForm"
import { emitToast } from "@/libs/react-toastify/utils"
import { AuthForm } from "./components/AuthForm"
import { Input } from "../shared/inputs/Input"
import Link from "next/link"
import "./styles.scss"

export function SignupPageComponent() {
    const form = useAuthForm("signup")
    const isFormBlocked = form.isSubmitting || form.isSubmitSuccessful

    function handleSignup(success: boolean) {
        if (!success) {
            return form.setError("email", { message: "This email is already registered" })
        }

        emitToast("success", "Your account has been successfully created!")
        return setTimeout(() => location.assign("/signin"), 2000)
    }

    function handleError(message: string) {
        emitToast("error", message)
        form.setError("root", {
            message:
                "Sorry, Something went wrong with your request. We're working to fix the issue."
        })
    }

    async function handleSuccessfulSubmit(formData: AuthFormFields<"signup">) {
        if (isFormBlocked) {
            return
        }

        return signupUseCase
            .execute(formData)
            .then((success) => handleSignup(success))
            .catch((error) => handleError(error.message))
    }

    return (
        <div className="form-container">
            <h2 className="form-container__title">Sign-up</h2>
            <AuthForm
                submitBtn="SIGN UP"
                isSubmitting={isFormBlocked}
                onSubmit={form.handleSubmit(handleSuccessfulSubmit)}
            >
                <div className="names-wrapper">
                    <Input
                        {...form.register("firstName")}
                        disabled={isFormBlocked}
                        type="text"
                        autocomplete="name"
                        id="firstName"
                        label="First name"
                        placeholder="First name"
                        error={form.errors.firstName?.message}
                    />
                    <Input
                        {...form.register("lastName")}
                        disabled={isFormBlocked}
                        type="text"
                        autocomplete="name"
                        id="lastName"
                        label="Last name"
                        placeholder="Last name"
                        error={form.errors.lastName?.message}
                    />
                </div>
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
                <PasswordInput
                    {...form.register("passwordConfirmation")}
                    disabled={isFormBlocked}
                    name="passwordConfirmation"
                    autocomplete="new-password"
                    id="password-confirmation"
                    label="Confirm Password"
                    error={form.errors.passwordConfirmation?.message}
                />
            </AuthForm>
            <div className="form-container__alt-page">
                <span>Have a account?</span>{" "}
                <Link className="form-container__signup-link" href="/signin">
                    Sign in here
                </Link>
            </div>
        </div>
    )
}
