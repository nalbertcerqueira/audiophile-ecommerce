"use client"

import { AuthForm } from "./components/AuthForm"
import { AuthFormFields } from "./types/types"
import { Input } from "../shared/Input"
import { customZodResolver } from "@/libs/zod"
import { signupSchema } from "./helpers/schemas"
import { FieldErrors, useForm } from "react-hook-form"
import Link from "next/link"
import "./styles.scss"

export function SignupPageComponent() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<AuthFormFields<"signup">>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: customZodResolver(signupSchema)
    })

    async function handleSuccessfulSubmit(data: AuthFormFields<"signup">) {
        if (!isSubmitting) {
            console.log(data)
        }
    }

    async function handleFailedSubmit(errors: FieldErrors<AuthFormFields<"signup">>) {
        if (!isSubmitting) {
            console.log(errors)
        }
    }

    return (
        <div className="form-container">
            <h2 className="form-container__title">Sign-up</h2>
            <AuthForm
                submitBtn="SIGN UP"
                isSubmitting={isSubmitting}
                submitHandler={handleSubmit(handleSuccessfulSubmit, handleFailedSubmit)}
            >
                <Input
                    {...register("name")}
                    type="text"
                    autocomplete="name"
                    id="name"
                    label="Name"
                    placeholder="Your Name"
                    error={errors.email?.message}
                />
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
                    autocomplete="new-password"
                    id="password"
                    label="Password"
                    placeholder="* * * * * * * * * *"
                    error={errors.password?.message}
                />
                <Input
                    {...register("passwordConfirmation")}
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
                <Link className="form-container__signup-link" href="/login">
                    Sign in here
                </Link>
            </div>
        </div>
    )
}
