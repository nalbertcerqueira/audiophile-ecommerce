"use client"

import { Input } from "@/components/shared/inputs/Input"
import { Fieldset } from "@/components/shared/form/Fieldset"
import { maskZipCode } from "@/utils/masks"
import { AddressFields } from "./types"
import { PrimaryButton } from "@/components/shared/buttons/PrimaryButton"
import { addressSchema } from "./schemas"
import { handleFormNumericField } from "@/utils/helpers"
import { useForm, Controller, FieldErrors } from "react-hook-form"
import { customZodResolver } from "@/libs/zod/resolvers"
import { useAppSelector } from "@/libs/redux/hooks"
import { selectUserAddress } from "@/store/user"

export function AddressForm() {
    const userAddress = useAppSelector(selectUserAddress)
    const { formState, control, register, handleSubmit } = useForm<AddressFields>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            address: userAddress?.address,
            country: userAddress?.country,
            city: userAddress?.city,
            zipCode: userAddress?.zipCode
        },
        resolver: customZodResolver(addressSchema)
    })

    function failedSubmit(errors: FieldErrors<AddressFields>) {
        console.log(errors)
    }

    function handleSuccessfulSubmit(data: AddressFields) {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(handleSuccessfulSubmit, failedSubmit)}>
            <Fieldset className="address-form" title="SHIPPING ADDRESS">
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
