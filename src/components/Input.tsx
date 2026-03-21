import { useState } from "preact/hooks";

interface InputProps {
    label: string,
    value?: string,
    error?: string,
    maxLength?: number,
    onChange: (value: string) => void
}

function Input({label, value, error, maxLength, onChange}: InputProps) {
    // const [internalValue, setInternalValue] = useState(value || '');

    // function handleSubmit(e: Event) {
    //     e.preventDefault();
    //     onChange(internalValue);
    // }

    return (
        <div class="input">
            <label>{label}</label>

                {/* <input type="text" value={internalValue} maxLength={maxLength || 15} onInput={(e) => setInternalValue((e.target as HTMLInputElement).value)} onBlur={handleSubmit}/> */}
                <input type="text" maxLength={maxLength || 15} onInput={(e) => onChange((e.target as HTMLInputElement).value)}/>
                {/* <button class="button" type="submit">✓</button> */}
            {error && <span class="error">{error}</span>}
        </div>
    )
}

export default Input;