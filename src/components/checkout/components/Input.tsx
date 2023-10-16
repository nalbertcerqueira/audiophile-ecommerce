import { HTMLInputTypeAttribute } from "react"

interface InputProps {
    label: string
    name: string
    checked?: boolean
    id?: string
    value?: string | number
    type: HTMLInputTypeAttribute
    autocomplete?: string
    placeholder?: string
}

export function Input(props: InputProps) {
    return (
        <div className="field">
            <div className="field__label-wrapper">
                <label className="field__input-label" htmlFor={props.id}>
                    {props.label}
                </label>
            </div>
            <input
                className="field__input"
                defaultChecked={props.checked}
                id={props.id}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                autoComplete={props.autocomplete}
            />
        </div>
    )
}
