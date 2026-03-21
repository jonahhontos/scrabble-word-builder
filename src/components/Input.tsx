import { useState } from "preact/hooks";

interface InputProps {
    label: string,
    error?: string,
    maxLength?: number,
    showError: boolean,
    onChange: (value: string) => void
}

function Input({label, error, maxLength, showError, onChange}: InputProps) {
    return (
        <div className="input">
            <label>{label}</label>
            <input type="text" maxLength={maxLength || 15} onInput={(e) => onChange((e.target as HTMLInputElement).value)}/>
            <span className={'error' + (showError ? ' visible' : '')}>{error}</span>
        </div>
    )
}

export default Input;