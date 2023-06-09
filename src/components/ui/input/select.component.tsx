import React, { ReactElement } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

type Props = {
  children: ReactElement[];
  name: string;
  register: UseFormRegister<any>;
  validationSchema?: RegisterOptions;
};
const SelectComponent = ({
  children,
  name,
  register,
  validationSchema = {},
}: Props) => {
  return (
    <select
      {...register(name, validationSchema)}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {children}
    </select>
  );
};

export default SelectComponent;
