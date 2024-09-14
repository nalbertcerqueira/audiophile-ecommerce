"use client"

import { Input } from "@/components/shared/inputs/Input"
import { Fieldset } from "@/components/shared/form/Fieldset"
import { RingLoader } from "@/components/shared/loaders/RingLoader"
import { PhoneInput } from "@/components/shared/inputs/PhoneInput"
import { ProfileFields } from "./types"
import { profileSchema } from "./schemas"
import { PrimaryButton } from "@/components/shared/buttons/PrimaryButton"
import { handleHttpErrors } from "@/utils/helpers"
import { ProfileImageInput } from "./ProfileImageInput"
import { customZodResolver } from "@/libs/zod/resolvers"
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks"
import { updateUserProfile, selectUserProfile } from "@/store/user"
import { useForm } from "react-hook-form"
import { emitToast } from "@/libs/react-toastify/utils"
import { FormEvent, useEffect } from "react"
import DefaultProfile from "../../../../../../public/imgs/profile.jpg"

const profileInitialState: ProfileFields = {
    firstName: "",
    lastName: "",
    phone: ""
}

export function ProfileForm() {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectUserProfile)
    const authenticatedProfile = (profile.type !== "guest" && profile) || null
    const profileImgUrl = authenticatedProfile?.profileImg || null
    const { control, formState, register, handleSubmit, reset } = useForm<ProfileFields>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: customZodResolver(profileSchema),
        defaultValues: profileInitialState
    })

    useEffect(() => {
        if (profile.type !== "guest") {
            const { firstName, lastName, phone } = profile
            reset({ firstName, lastName, phone: phone || "" })
        }
    }, [profile, reset])

    async function formHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!formState.isSubmitting) {
            return await handleSubmit(handleSuccessfulSubmit)(e)
        }
    }

    async function handleSuccessfulSubmit(data: ProfileFields) {
        const toastId = emitToast("loading", "Saving your changes, please wait...'")
        return dispatch(updateUserProfile(data))
            .unwrap()
            .then(() => emitToast("success", "Profile updated with success!", { toastId }))
            .catch((error: Error) => handleHttpErrors(error, true, toastId))
    }

    return (
        <form encType="multipart/form-data" onSubmit={formHandler} className="profile-form">
            <ProfileImageInput
                control={control}
                imageUrl={profileImgUrl || DefaultProfile.src}
                name="profileImg"
                id="profile-img"
                error={formState.errors.profileImg?.message}
            />
            <div className="profile-form__inputs">
                <Fieldset fieldsClassName="profile-form__fields" title="PROFILE INFO">
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
                        value={authenticatedProfile?.email}
                        placeholder="alexei@mail.com"
                    />
                </Fieldset>
                <PrimaryButton
                    ariaDisabled={formState.isSubmitting}
                    disabled={formState.isSubmitting}
                    type="submit"
                    className="tab-submit-btn"
                >
                    {formState.isSubmitting && (
                        <div className="btn-overlay">
                            <RingLoader />
                        </div>
                    )}
                    SAVE CHANGES
                </PrimaryButton>
            </div>
        </form>
    )
}
