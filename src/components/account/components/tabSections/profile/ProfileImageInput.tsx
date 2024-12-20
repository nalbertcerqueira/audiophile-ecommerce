/* eslint-disable @next/next/no-img-element */
"use client"

import { toBase64 } from "@/utils/helpers"
import { UploadIcon } from "@/components/shared/icons/UploadIcon"
import { allowedImgTypes } from "@/@core/shared/entities/constants"
import { Controller, Path, Control } from "react-hook-form"
import { KeyboardEvent, useRef, useState } from "react"

interface ProfileImageInputProps<Fields extends Record<string, any>> {
    id: string
    name: Path<Fields>
    imageUrl: string
    control: Control<Fields, any>
    error?: string
}

export function ProfileImageInput<Fields extends Record<string, any>>(
    props: ProfileImageInputProps<Fields>
) {
    const { id, name, imageUrl, control, error } = props
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [base64Image, setBase64Image] = useState<string | null>("")

    function handleFileClick(e: KeyboardEvent<HTMLLabelElement>) {
        if (e.key === "Enter" && fileRef.current) {
            fileRef.current.click()
        }
    }

    function renderProfileImgError() {
        if (error) {
            return (
                <p id="profile-img-error" aria-live="assertive" className="file-field__error">
                    {error}
                </p>
            )
        }
    }

    async function displayLocalImage(successCb: () => void, failedCb: () => void) {
        const file = fileRef.current?.files?.item(0)

        if (file) {
            if (!allowedImgTypes.includes(file.type)) {
                setBase64Image(null)
                failedCb()
            } else {
                setBase64Image(await toBase64(file))
                successCb()
            }
        } else {
            setBase64Image(null)
            successCb()
        }
    }

    return (
        <div className="file-field">
            <div className="file-field__img-wrapper">
                <label
                    onKeyUp={handleFileClick}
                    tabIndex={0}
                    aria-label="upload profile image"
                    className="file-field__label"
                    htmlFor={id}
                >
                    <Controller
                        control={control}
                        name={name}
                        render={({ field: { name, disabled, ref, onBlur, onChange } }) => {
                            return (
                                <input
                                    aria-invalid={!!error}
                                    aria-describedby={`${id}-error`}
                                    name={name}
                                    onBlur={onBlur}
                                    disabled={disabled}
                                    accept="image/*"
                                    className="file-field__input"
                                    spellCheck="false"
                                    type="file"
                                    id={id}
                                    ref={(e) => {
                                        ref(e)
                                        fileRef.current = e
                                    }}
                                    onChange={(e) => {
                                        const file = e.target.files?.item(0)
                                        displayLocalImage(
                                            onChange.bind({}, file || undefined),
                                            onChange.bind({}, undefined)
                                        )
                                    }}
                                />
                            )
                        }}
                    />
                    <div className="file-field__img-overlay">
                        <UploadIcon className="file-field__overlay-icon" />
                        <span className="file-field__overlay-content">Upload Image</span>
                    </div>
                </label>
                <img
                    className="file-field__img"
                    src={base64Image || imageUrl}
                    alt="Profile image"
                />
            </div>
            {renderProfileImgError()}
        </div>
    )
}
