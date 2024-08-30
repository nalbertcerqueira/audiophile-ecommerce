"use client"

import { Input } from "@/components/shared/inputs/Input"
import { Fieldset } from "@/components/shared/form/Fieldset"
import { PhoneInput } from "@/components/shared/inputs/PhoneInput"
import { ProfileFields } from "./types"
import { profileSchema } from "./schemas"
import { PrimaryButton } from "@/components/shared/buttons/PrimaryButton"
import { ProfileImageInput } from "./ProfileImageInput"
import { customZodResolver } from "@/libs/zod/resolvers"
import { useForm, FieldErrors } from "react-hook-form"

const profileFormInitialState: ProfileFields = {
    firstName: "",
    lastName: "",
    phone: ""
}

export function ProfileForm() {
    const { control, formState, register, handleSubmit } = useForm<ProfileFields>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: profileFormInitialState,
        resolver: customZodResolver(profileSchema)
    })

    function handleSuccessfulSubmit(data: ProfileFields) {
        console.log(data)
    }

    function handleFailedSubmit(errors: FieldErrors<ProfileFields>) {
        console.log(errors)
    }

    return (
        <form
            encType="multipart/form-data"
            onSubmit={handleSubmit(handleSuccessfulSubmit, handleFailedSubmit)}
            className="profile-form"
        >
            <ProfileImageInput
                control={control}
                name="profileImg"
                id="profile-img"
                error={formState.errors.profileImg?.message}
            />
            <div>
                <Fieldset title="PROFILE INFO">
                    <Input
                        {...register("firstName")}
                        error={formState.errors.firstName?.message}
                        label="First name"
                        id="first-name"
                        type="text"
                        autocomplete="name"
                        placeholder="Alexei"
                    />
                    <Input
                        {...register("lastName")}
                        error={formState.errors.lastName?.message}
                        label="Last name"
                        id="last-name"
                        type="text"
                        autocomplete="name"
                        placeholder="Ward"
                    />
                    <PhoneInput
                        name="phone"
                        placeholder="+1 (999) 999-9999"
                        label="Phone Number"
                        control={control}
                        error={formState.errors.phone?.message}
                    />
                    <Input
                        name="email"
                        label="Email address"
                        id="email"
                        type="text"
                        disabled={true}
                        placeholder="alexei@mail.com"
                    />
                </Fieldset>
                <PrimaryButton type="submit" className="tab-submit-btn">
                    SAVE CHANGES
                </PrimaryButton>
            </div>
        </form>
    )
}
