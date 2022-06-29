import React from "react";
import { ButtonVariants, ColorSchemes, Sizes } from "../types/theme";
import Column from "./column";
import Row from "./row";

export type ButtonProps = {
  colorScheme?: ColorSchemes;
  variant?: ButtonVariants;
  size?: Sizes;
  shape?: "pill" | "rounded";
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children?: React.ReactNode | React.ReactNode[];
  pending?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function _Button(
  {
    colorScheme,
    children,
    size = "md",
    type = "button",
    variant = "solid",
    shape = "pill",
    pending = false,
    disabled = false,
    onClick,
  }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`
      ${baseButtonClasses}
      ${sizeClassMap[size]}
      ${shapeClassMap[shape]}
      ${baseButtonVariantClassMap[variant][colorScheme || "undefined"]} 
      ${
        pending
          ? pendingBaseButtonClasses
          : disabled
          ? disabledBaseButtonClasses
          : baseButtonActiveVariantClassMap[variant][colorScheme || "undefined"]
      }
      `}
      onClick={
        pending || disabled ? (event) => event?.preventDefault() : onClick
      }
      disabled={disabled}
    >
      {pending && (
        <Column className="absolute inset-0 items-center justify-center">
          Loading...
          {/* <Spinner
            size={size}
            color={spinnerIntentColorMap[variant][colorScheme || "undefined"]}
          /> */}
        </Column>
      )}
      <Row
        className={`justify-center items-center ${pending ? "invisible" : ""}`}
      >
        {children}
      </Row>
    </button>
  );
}

const Button = React.forwardRef(_Button);
export default Button;

const baseButtonClasses = `relative uppercase justify-center items-center font-bold focus:outline-none transition`;
const disabledBaseButtonClasses = `cursor-not-allowed opacity-50`;
const pendingBaseButtonClasses = `cursor-wait`;

const sizeClassMap = {
  xl: `px-10 min-h-14 text-md py-xs`,
  lg: `px-8 min-h-12 text-sm py-xs`,
  md: `px-4 min-h-10 text-sm py-xs`,
  sm: `px-3 min-h-8 text-xs py-1`,
  xs: `px-2 min-h-6 text-xs py-0.5`,
};

const shapeClassMap = {
  pill: "rounded-full",
  rounded: "rounded",
};

const baseButtonVariantClassMap: any = {
  solid: {
    primary: `text-white bg-primary-500`,
    danger: `text-white bg-danger-500`,
    warning: `text-white bg-warning-400`,
    success: `text-white bg-success-400`,
    info: `text-white bg-info-400`,
    white: `text-primary-500 bg-white`,
    dark: `text-white bg-gray-500`,
    undefined: `text-gray-700 bg-gray-100`,
  },
  outline: {
    primary: `border border-primary-500 text-primary-500`,
    danger: `border border-danger-500 text-danger-500`,
    warning: `border border-warning-500 text-warning-500`,
    success: `border border-success-500 text-success-500`,
    info: `border border-info-500 text-info-500`,
    white: `border border-white text-white`,
    dark: `border border-gray-500 text-gray-500`,
    undefined: `border border-gray-300 text-gray-700`,
  },
  ghost: {
    primary: `text-primary-500 bg-primary-50`,
    danger: `text-danger-500 bg-danger-50`,
    warning: `text-warning-500 bg-warning-50`,
    success: `text-success-500 bg-success-50`,
    info: `text-info-500 bg-info-50`,
    dark: `text-gray-500 bg-gray-50`,
    undefined: `text-gray-700 bg-gray-100`,
  },
};

const baseButtonActiveVariantClassMap: any = {
  solid: {
    primary: `hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-800 focus:ring focus:ring-primary-100 shadow`,
    danger: `hover:bg-danger-600 focus:bg-danger-600 active:bg-danger-800 focus:ring focus:ring-danger-200 shadow`,
    warning: `hover:bg-warning-500 focus:bg-warning-500 active:bg-warning-600 focus:ring focus:ring-warning-200 shadow`,
    success: `hover:bg-success-500 focus:bg-success-500 active:bg-success-600 focus:ring focus:ring-success-200 shadow`,
    info: `hover:bg-info-500 focus:bg-info-500 active:bg-info-600 focus:ring focus:ring-info-200 shadow`,
    white: `hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-50 focus:ring focus:ring-white shadow`,
    dark: `hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-700 focus:ring focus:ring-gray-200 shadow`,
    undefined: `hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300 focus:ring focus:ring-gray-400 shadow`,
  },
  outline: {
    primary: `hover:bg-primary-50 focus:bg-primary-50 active:bg-primary-100 focus:ring focus:ring-primary-200`,
    danger: `hover:bg-danger-50 focus:bg-danger-50 active:bg-danger-100 focus:ring focus:ring-danger-200`,
    warning: `hover:bg-warning-50 focus:bg-warning-50 active:bg-warning-100 focus:ring focus:ring-warning-200`,
    success: `hover:bg-success-50 focus:bg-success-50 active:bg-success-100 focus:ring focus:ring-success-200`,
    info: `hover:bg-info-50 focus:bg-info-50 active:bg-info-100 focus:ring focus:ring-info-200`,
    white: `hover:bg-white hover:bg-opacity-10 focus:bg-opacity-10 focus:bg-white active:bg-white active:bg-opacity-30 focus:ring focus:ring-primary-200`,
    dark: `hover:bg-gray-50 focus:bg-gray-50 active:bg-gray-100 focus:ring focus:ring-gray-200`,
    undefined: `hover:bg-gray-100 hover:bg-opacity-30 focus:bg-opacity-30 focus:bg-gray-100 active:bg-gray-200 focus:ring focus:ring-gray-300`,
  },
  ghost: {
    primary: `active:bg-primary-100 focus:ring focus:ring-primary-200`,
    danger: `active:bg-danger-100 focus:ring focus:ring-danger-200`,
    warning: `active:bg-warning-100 focus:ring focus:ring-warning-200`,
    success: `active:bg-success-100 focus:ring focus:ring-success-200`,
    info: `active:bg-info-100 focus:ring focus:ring-info-200`,
    dark: `active:bg-gray-100 focus:ring focus:ring-gray-200`,
    undefined: `active:bg-gray-200 focus:ring focus:ring-gray-300`,
  },
};

export const spinnerIntentColorMap: any = {
  solid: {
    primary: `white`,
    danger: `white`,
    warning: `gray-900`,
    success: `white`,
    info: `white`,
    dark: `white`,
    undefined: `gray-500`,
  },
  outline: {
    primary: `primary-500`,
    danger: `danger-500`,
    warning: `warning-500`,
    success: `success-500`,
    info: `info-500`,
    dark: `gray-500`,
    undefined: `gray-500`,
  },
  ghost: {
    primary: `primary-500`,
    danger: `danger-500`,
    warning: `warning-500`,
    success: `success-500`,
    info: `info-500`,
    dark: `gray-500`,
    undefined: `gray-500`,
  },
};
