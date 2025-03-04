import React, { ChangeEvent, useRef } from "react";
import { useMaskedInput } from "../hooks/useMaskedInput";

interface MaskedInputProps {
    mask: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    name?: string;
    required?: boolean;
    placeholder?: string;
    className?: string;
}

export const MaskedInput: React.FC<MaskedInputProps> = ({
    mask,
    value,
    onChange,
    id,
    name,
    required,
    placeholder,
    className,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const valueToEventAdapter = (value: string) => {
        const syntheticEvent = {
            target: {
                value,
                name: name || "",
            },
        } as ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
    };

    const { inputValue, handleChange } = useMaskedInput({
        mask,
        value,
        onChange: valueToEventAdapter,
    });

    return (
        <input
            ref={inputRef}
            type="text"
            id={id}
            name={name}
            value={inputValue}
            onChange={handleChange}
            required={required}
            placeholder={placeholder || mask.replace(/9/g, "_")}
            className={className}
        />
    );
};
