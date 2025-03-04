import React, { ChangeEvent } from "react";
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
    const { inputValue, handleChange } = useMaskedInput({
        mask,
        value,
        onChange,
    });

    return (
        <input
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
