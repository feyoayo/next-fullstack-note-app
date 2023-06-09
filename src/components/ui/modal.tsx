import React, { ReactElement } from "react";
import CloseIconSvg from "@/components/svg/closeIcon.svg";

interface Props {
  onClose: () => void;
  title?: string;
  children: ReactElement;
}
const Modal = ({ onClose, title = "", children }: Props) => {
  return (
    <div
      id={title.toLowerCase()}
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-1/2 left-1/2 right-1/2 z-50 flex justify-center items-center    w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full animate-transition"
    >
      <div
        className={"absolute opacity-70 bg-black h-full w-full"}
        onClick={onClose}
      />
      <div className="relative -mt-10 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <CloseIconSvg onClick={onClose} />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
