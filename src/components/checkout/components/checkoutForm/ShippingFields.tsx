import { Input } from "@/components/shared/inputs/Input"
import { Fieldset } from "@/components/shared/form/Fieldset"
import { maskZipCode } from "@/utils/masks"
import { handleFormNumericField } from "@/utils/helpers"
import { BaseCheckoutFieldProps } from "./types"
import { Controller } from "react-hook-form"

export function ShippingFields(props: BaseCheckoutFieldProps) {
    const { fieldsetTitle, formErrors, control, register } = props

    return (
        <Fieldset title={fieldsetTitle} className="checkout-form__shipping-details">
            <Input
                {...register("address")}
                error={formErrors.address?.message}
                label="Address"
                id="address"
                type="text"
                autocomplete="shipping"
                placeholder="1137 Williams Avenue"
            />
            <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        value={maskZipCode(field.value || "")}
                        onChange={handleFormNumericField(field, 8)}
                        error={formErrors.zipCode?.message}
                        label="ZIP Code"
                        id="zip-code"
                        type="text"
                        autocomplete="postal-code"
                        placeholder="10001"
                    />
                )}
            />
            <Input
                {...register("city")}
                error={formErrors.city?.message}
                label="City"
                id="city"
                type="text"
                autocomplete="home city"
                placeholder="New York"
            />
            <Input
                {...register("country")}
                error={formErrors.country?.message}
                label="Country"
                id="country"
                type="text"
                autocomplete="country-name"
                placeholder="United States"
            />
        </Fieldset>
    )
}
