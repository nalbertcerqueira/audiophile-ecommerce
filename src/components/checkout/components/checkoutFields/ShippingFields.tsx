import { handleNumericField, maskZipCode } from "../../helpers/utils"
import { Input } from "../../../shared/Input"
import { Controller } from "react-hook-form"
import { BaseCheckoutFieldProps } from "./types"

export function ShippingFields(props: BaseCheckoutFieldProps) {
    const { fieldsetTitle, formErrors, control, register } = props
    return (
        <fieldset className="checkout__shipping-details">
            <legend className="checkout__group-name">{fieldsetTitle}</legend>
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
                        onChange={handleNumericField(field, 8)}
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
                autocomplete="home-city"
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
        </fieldset>
    )
}
