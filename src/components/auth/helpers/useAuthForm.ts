import { signinSchema, signupSchema } from "./schemas"
import { customZodResolver } from "@/libs/zod/resolvers"
import { AuthFormFields } from "../types/types"
import { useForm } from "react-hook-form"

export function useAuthForm<T extends "signin" | "signup">(type: T) {
    const schema = type === "signin" ? signinSchema : signupSchema

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm<AuthFormFields<T>>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: customZodResolver(schema)
    })

    return {
        errors,
        isSubmitting,
        isSubmitSuccessful,
        register,
        handleSubmit,
        setError
    }
}
