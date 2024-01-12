"use client"

import { signupUseCase } from "@/@core/frontend/main/usecases/auth/signupFactory"
import { customZodResolver } from "@/libs/zod/resolvers"
import { AuthFormFields } from "./types/types"
import { signupSchema } from "./helpers/schemas"
import { AuthForm } from "./components/AuthForm"
import { Input } from "../shared/Input"
import { FieldErrors, useForm } from "react-hook-form"
import { emitToast } from "@/libs/react-toastify/utils"
import Link from "next/link"
import "./styles.scss"

export function SignupPageComponent() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm<AuthFormFields<"signup">>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: customZodResolver(signupSchema)
    })

    const isFormBlocked = isSubmitting || isSubmitSuccessful

    async function handleSuccessfulSubmit(formData: AuthFormFields<"signup">) {
        if (isFormBlocked) return

        try {
            const isUserCreated = await signupUseCase.execute(formData)
            if (!isUserCreated) {
                return setError("email", { message: "This email is already registered" })
            }
            emitToast("success", "Your account has been successfully created!")
            setTimeout(() => location.assign("/signin"), 2000)
        } catch (error: any) {
            console.log(error)
        }
    }

    async function handleFailedSubmit(errors: FieldErrors<AuthFormFields<"signup">>) {
        if (!isFormBlocked) {
            console.log(errors)
        }
    }

    return (
        <div className="form-container">
            <h2 className="form-container__title">Sign-up</h2>
            <AuthForm
                submitBtn="SIGN UP"
                isSubmitting={isFormBlocked}
                submitHandler={handleSubmit(handleSuccessfulSubmit, handleFailedSubmit)}
            >
                <Input
                    {...register("name")}
                    disabled={isFormBlocked}
                    type="text"
                    autocomplete="name"
                    id="name"
                    label="Name"
                    placeholder="Your Name"
                    error={errors.name?.message}
                />
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
                    autocomplete="new-password"
                    id="password"
                    label="Password"
                    placeholder="* * * * * * * * * *"
                    error={errors.password?.message}
                />
                <Input
                    {...register("passwordConfirmation")}
                    disabled={isFormBlocked}
                    name="passwordConfirmation"
                    type="password"
                    autocomplete="new-password"
                    id="password-confirmation"
                    label="Confirm Password"
                    placeholder="* * * * * * * * * *"
                    error={errors.passwordConfirmation?.message}
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
