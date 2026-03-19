import { useState } from "preact/hooks";

interface InputProps {
    label: string,
    value?: string,
    error?: string,
    onChange: (value: string) => void
}

function Input({label, value, error, onChange}: InputProps) {
    const [internalValue, setInternalValue] = useState(value || '');

    function handleSubmit(e: Event) {
        e.preventDefault();
        onChange(internalValue);
    }

    return (
        <div class="input">
            <label>{label}</label>
            <form onSubmit={handleSubmit}>
                <input type="text" value={value} onInput={(e) => onChange((e.target as HTMLInputElement).value)} />
                <button type="submit">use</button>
            </form>
            {error && <p class="error">{error}</p>}
        </div>
    )
}

export default Input;