import React from "react";
import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

/**
 * InputField component renders a labeled input field with optional error message.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.label - The label text for the input field.
 * @param {string} [props.type="text"] - The type of the input field (e.g., "text", "password").
 * @param {Function} props.register - The register function from react-hook-form for input validation.
 * @param {string} props.name - The name of the input field.
 * @param {string} [props.defaultValue] - The default value of the input field.
 * @param {Object} [props.error] - The error object containing validation error message.
 * @param {boolean} [props.hidden] - Flag to hide the input field.
 * @param {Object} [props.inputProps] - Additional properties to be passed to the input element.
 *
 * @returns {JSX.Element} The rendered InputField component.
 */

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;