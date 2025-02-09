import { ReactNode } from "react";

export interface SocialButtonProps {
    icon: ReactNode;
    text: string;
    onClick?: () => void;
    provider?: string; // New property
}

export interface InputFieldProps {
    label: string;
    type?: string;
    id: string;
    hasIcon?: boolean;
    iconSrc?: string;
    className?: string;
    onChange?: (e?: any) => void;
    value?: string;
    required?: boolean;
}
