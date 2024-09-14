"use client"

import { Input } from "@/components/shared/inputs/Input"
import { Fieldset } from "@/components/shared/form/Fieldset"
import { maskZipCode } from "@/utils/masks"
import { AddressFields } from "./types"
import { PrimaryButton } from "@/components/shared/buttons/PrimaryButton"
import { addressSchema } from "./schemas"
import { handleFormNumericField, handleHttpErrors } from "@/utils/helpers"
import { useForm, Controller } from "react-hook-form"
import { customZodResolver } from "@/libs/zod/resolvers"
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks"
import { selectUserAddress, updateUserAddress } from "@/store/user"
import { useEffect, FormEvent } from "react"
import { emitToast } from "@/libs/react-toastify/utils"

const profileInitialState: AddressFields = {
    address: "",
    country: "",
    city: "",
    zipCode: ""
}

export function AddressForm() {
    const dispatch = useAppDispatch()
    const userAddress = useAppSelector(selectUserAddress)
    const { formState, control, register, handleSubmit, reset } = useForm<AddressFields>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: customZodResolver(addressSchema),
        defaultValues: profileInitialState
    })

    useEffect(() => {
        if (userAddress) {
            reset(userAddress)
        }
    }, [userAddress, reset])

    async function formHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!formState.isSubmitting) {
            return await handleSubmit(handleSuccessfulSubmit)(e)
        }
    }

    async function handleSuccessfulSubmit(data: AddressFields) {
        const toastId = emitToast("loading", "Saving your changes, please wait...'")
        return dispatch(updateUserAddress(data))
            .unwrap()
            .then(() => emitToast("success", "Address updated with success!", { toastId }))
            .catch((error: Error) => handleHttpErrors(error, true, toastId))
    }

    return (
        <form onSubmit={formHandler}>
            <Fieldset
                fieldsClassName="address-form__fields"
                className="address-form"
                title="SHIPPING ADDRESS"
            >
                <Input
                    {...register("address")}
                    error={formState.errors.address?.message}
                    label="Address"
                    id="address"
                    type="text"
                    autocomplete="shipping"
                    placeholder="1137 Williams Avenue"
                />
                <Input
                    {...register("country")}
                    error={formState.errors.country?.message}
                    label="Country"
                    id="country"
                    type="text"
                    autocomplete="country-name"
                    placeholder="United States"
                />
                <Input
                    {...register("city")}
                    error={formState.errors.city?.message}
                    label="city"
                    id="city"
                    type="text"
                    autocomplete="home city"
                    placeholder="New York"
                />

                <Controller
                    name="zipCode"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            value={maskZipCode(field.value || "")}
                            onChange={handleFormNumericField(field, 8)}
                            error={formState.errors.zipCode?.message}
                            label="ZIP Code"
                            id="zip-code"
                            type="text"
                            autocomplete="postal-code"
                            placeholder="10001"
                        />
                    )}
                />
            </Fieldset>
            <PrimaryButton className="tab-submit-btn" type="submit">
                SAVE CHANGES
            </PrimaryButton>
        </form>
    )
}
