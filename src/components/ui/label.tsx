import React from "react";

interface Props {
  htmlFor: string;
  label: string;
  required?: boolean;
}
const Label = ({ htmlFor, label, required }: Props) => {
  return (
    <label
      className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}
      htmlFor={htmlFor}
    >
      {label}
      {required && "*"}
    </label>
  );
};

export default Label;
