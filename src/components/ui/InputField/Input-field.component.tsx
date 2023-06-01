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
    <div>
      <label className={"inline-block w-[100px]"} htmlFor={name}>
        {label}
        {required && "*"}
      </label>
      {/* @ts-ignore */}
      <input
        {...register(name, validationSchema)}
        className={classNames("outline-none border border-2 rounded-lg px-1", {
          ["border-red-500"]: errors && errors[name],
        })}
        type={type}
      />
    </div>
  );
};

export default InputField;
