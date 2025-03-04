import { useState, useEffect, ChangeEvent } from "react";

interface UseMaskedInputProps {
    mask: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useMaskedInput = ({
    mask,
    value,
    onChange,
}: UseMaskedInputProps) => {
    const [inputValue, setInputValue] = useState(value || "");

    useEffect(() => {
        setInputValue(value || "");
    }, [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        // Если пользователь удаляет символы, просто обновляем значение
        if (val.length < inputValue.length) {
            setInputValue(val);

            // Создаем синтетическое событие
            const syntheticEvent = {
                ...e,
                target: {
                    ...e.target,
                    value: val,
                },
            };

            onChange(syntheticEvent as ChangeEvent<HTMLInputElement>);
            return;
        }

        const rawValue = val.replace(/[^0-9]/g, "");

        let formattedValue = "";
        let rawIndex = 0;

        for (let i = 0; i < mask.length && rawIndex < rawValue.length; i++) {
            if (mask[i] === "9") {
                formattedValue += rawValue[rawIndex];
                rawIndex++;
            } else {
                formattedValue += mask[i];

                if (
                    i + 1 < mask.length &&
                    mask[i + 1] !== "9" &&
                    rawIndex < rawValue.length
                ) {
                    formattedValue += mask[i + 1];
                    i++;
                }
            }
        }

        const syntheticEvent = {
            ...e,
            target: {
                ...e.target,
                value: formattedValue,
            },
        };

        setInputValue(formattedValue);
        onChange(syntheticEvent as ChangeEvent<HTMLInputElement>);
    };

    return {
        inputValue,
        handleChange,
    };
};
