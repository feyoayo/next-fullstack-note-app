import { Spinner } from "../loaders";
import { ButtonProps } from "./main-button.component";
import classNames from "classnames";

const OutlineButton = ({ children, isLoading, onClick, type, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames("relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800", className)}
    >
      <span className="inline-block w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {isLoading ? (
          <div className={"w-10 flex justify-center"}>
            <Spinner />
          </div>
        ) : (
          children
        )}
      </span>
    </button>
  );
};
export default OutlineButton;
