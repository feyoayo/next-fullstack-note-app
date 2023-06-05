import React, { ChangeEvent, Component } from "react";
import classNames from "classnames";
import { UseFormRegister } from "react-hook-form";

interface Props {
  error?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<any> | any;
  type: string;
  value?: string;
  name?: string;
}

const InputComponent = ({
  type,
  error,
  value,
  onChange,
  register = () => {},
  name,
}: Props) => {
  return (
    <input
      onChange={onChange}
      value={value}
      {...register(name)}
      className={classNames(
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500px-1",
        {
          ["border-red-500"]: error,
        }
      )}
      type={type}
    />
  );
};

export default InputComponent;
