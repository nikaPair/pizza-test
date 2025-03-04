import { useState, useEffect, ChangeEvent } from "react";

interface UseMaskedInputProps {
    mask: string;
    value: string;
    onChange: (value: string) => void;
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

    const applyMask = (value: string): string => {
        const digits = value.replace(/\D/g, "");

        if (digits.length === 0) {
            const firstDigitPos = mask.indexOf("9");
            if (firstDigitPos > 0) {
                return mask.substring(0, firstDigitPos);
            }
            return "";
        }

        let result = "";
        let digitIndex = 0;

        for (let i = 0; i < mask.length; i++) {
            if (digitIndex >= digits.length && mask[i] === "9") {
                break;
            }

            if (mask[i] === "9") {
                result += digits[digitIndex];
                digitIndex++;
            } else {
                result += mask[i];
            }
        }

        return result;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const cursorPosition = input.selectionStart || 0;
        const currentValue = input.value;

        const isAddition = currentValue.length > inputValue.length;

        const firstDigitPos = mask.indexOf("9");

        if (
            !isAddition &&
            cursorPosition <= firstDigitPos &&
            firstDigitPos > 0
        ) {
            setInputValue(inputValue);

            setTimeout(() => {
                if (input) {
                    input.setSelectionRange(firstDigitPos, firstDigitPos);
                }
            }, 0);

            return;
        }

        const maskedValue = applyMask(currentValue);

        setInputValue(maskedValue);
        onChange(maskedValue);
    };

    return {
        inputValue,
        handleChange,
    };
};
