import * as React from "react";
import { InputFieldProps } from "./types";

export const InputField: React.FC<InputFieldProps> = ({
    label,
    type = "text",
    id,
    value,
    hasIcon,
    iconSrc,
    className,
    onChange,
    required = false,
}) => {
    return (
        <div className={`relative ${className}`}>
            <label htmlFor={id} className="sr-only">
                {label}
            </label>
            <div className="flex gap-5 justify-between px-4 py-3.5 leading-none whitespace-nowrap border border-solid bg-slate-50 border-zinc-300">
                <input
                    type={type}
                    id={id}
                    placeholder={label}
                    className="bg-transparent outline-none w-full"
                    aria-label={label}
                    onChange={onChange}
                    value={value}
                    required={required}
                />
                {hasIcon && iconSrc && (
                    <img
                        loading="lazy"
                        src={iconSrc}
                        alt=""
                        className="object-contain shrink-0 aspect-square w-[18px]"
                    />
                )}
            </div>
        </div>
    );
};
