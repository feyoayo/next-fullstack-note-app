import React from "react";
import CloseIconSvg from "@/components/svg/closeIcon.svg";
import { ButtonProps } from "@/components/ui/buttons/main-button.component";

interface Props extends Pick<ButtonProps, "onClick"> {}
const CloseButtonComponent = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
      data-modal-hide="authentication-modal"
    >
      <CloseIconSvg onClick={onClick} />
      <span className="sr-only">Close button</span>
    </button>
  );
};

export default CloseButtonComponent;
