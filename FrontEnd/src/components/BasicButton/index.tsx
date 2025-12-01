import type { ReactNode } from "react";
import * as S from "./styles";

interface ButtonProps {
  icon?: ReactNode;
  iconColorHover?: ReactNode;
  children?: ReactNode;
  textColor: string;
  textColorHover?: string;
  font?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  width: "small" | "medium" | "large" | "fullWidth";
  height: "small" | "medium" | "large" | "fullWidth";
  bgColor: string;
  bgColorHover?: string;
  borderColor?: boolean;
  disabled?: boolean;
  gap?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  icon,
  iconColorHover,
  children,
  textColor,
  font = "medium",
  width = "medium",
  height = "medium",
  bgColor = "#0070f3",
  textColorHover = "#ffffff",
  bgColorHover,
  borderColor,
  disabled = false,
  gap = "2rem",
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <S.Button
      textColorHover={textColorHover}
      type={type}
      gap={gap}
      borderColor={borderColor}
      iconColorHover={iconColorHover}
      bgColorHover={bgColorHover}
      textColor={textColor}
      font={font}
      width={width}
      height={height}
      bgColor={bgColor}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {children}
    </S.Button>
  );
}
