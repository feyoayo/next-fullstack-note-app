import { Spinner } from "../loaders";

export interface ButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
  children: string;
  type?: "button" | "submit" | "reset";
}
const MainButton = ({ isLoading, onClick, type, children }: ButtonProps) => {
  return (
    <button
      className={
        "flex text-sm justify-center text-center w-24 rounded-full py-1 px-3 bg-green-400"
      }
      type={type}
      onClick={onClick}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default MainButton;
