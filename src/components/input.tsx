import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface InputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "onChange" | "type" | "size"
  > {
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "tel";
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  error?: any;
}

function _Input(
  {
    className = "",
    type = "text",
    disabled = false,
    value = "",
    onChange,
    error,
    autoFocus,
    ...rest
  }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <input
      className={`${baseClasses} ${disabledClasses} ${
        error ? errorClasses : defaultClasses
      } ${className}`}
      type={type}
      ref={ref as any}
      value={value}
      disabled={disabled}
      onChange={(event) => onChange?.(event.target.value, event)}
      {...rest}
    />
  );
}

const Input = React.forwardRef(_Input);
export default Input;

const baseClasses = `w-full min-h-xl py-0 text-sm text-gray-900 placeholder-gray-300 rounded-md shadow-sm transition`;
const defaultClasses = `bg-gray-50 border-gray-300 focus:border-primary-300 focus:ring focus:ring-primary-200`;
const errorClasses = `bg-danger-50 bg-opacity-33 border-danger-300 focus:border-danger-300 focus:ring focus:ring-danger-200`;
const disabledClasses = `disabled:border-dashed disabled:border-gray-200 disabled:bg-white disabled:cursor-not-allowed disabled:text-gray-400`;
