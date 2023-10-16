"use client"

interface RadioInputProps {
    label: string
    name: string
    value?: string
    id?: string
    checked?: boolean
    onChange?: () => void
}

export function RadioInput(props: RadioInputProps) {
    return (
        <div className="radio-field">
            <input
                onChange={props.onChange}
                className="radio-field__input"
                value={props.value}
                checked={props.checked}
                type="radio"
                name={props.name}
                id={props.id}
            />
            <label className="radio-field__label" htmlFor={props.id}>
                {props.label}
            </label>
        </div>
    )
}
