import classNames from "classnames";
import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputFieldInterface {
  label?: string;
  name: string;
  type: HTMLInputTypeAttribute;
  register: UseFormRegister<any>;
  validationSchema?: RegisterOptions;
  required?: boolean;
  errors?: FieldErrors;
}
const InputField = ({
  label,
  type,
  register,
  name,
  validationSchema,
  required,
  errors,
}: InputFieldInterface) => {
  return (
    <div className={"w-full"}>
      <label
        className={
          "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        }
        htmlFor={name}
      >
        {label}
        {required && "*"}
      </label>
      {/* @ts-ignore */}
      <input
        {...register(name, validationSchema)}
        className={classNames(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500px-1",
          {
            ["border-red-500"]: errors && errors[name],
          }
        )}
        type={type}
      />
    </div>
  );
};

export default InputField;
