import * as React from "react";
import { SocialButtonProps } from "./types";

export const SocialButton: React.FC<SocialButtonProps> = ({
    icon,
    text,
    onClick,
    provider, // New property
}) => {
    return (
        <button
            onClick={onClick}
            className={`flex gap-2.5 px-16 py-3 mt-2 text-sm leading-none text-black bg-white rounded-sm border border-solid border-zinc-300 max-md:px-5 w-full ${provider}`}
        >
            {icon}
            <span>{text}</span>
        </button>
    );
};
