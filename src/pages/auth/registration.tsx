import { UserInterface } from "@/types/auth";
import { AxiosError } from "@/types/error";
import { AuthenticateService } from "@/ui-services/authenticate.service";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
interface RegistrationField {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const RegistrationPage = () => {
  const { register, handleSubmit } = useForm<RegistrationField>();
  const { mutate, isLoading, error } = useMutation<any, AxiosError, any>(
    (data: UserInterface) => AuthenticateService.registerUser(data)
  );

  const onSubmit = (data: UserInterface) => {
    const { email, firstName, lastName, password } = data;
    const payload: UserInterface = {
      email,
      firstName,
      lastName,
      password,
    };
    mutate(payload);
  };
  useEffect(() => {
    if (error) {
      toast.error(
        error?.response?.data?.error || "Something wrong while registration",
        {
          theme: "colored",
        }
      );
    }
  }, [error]);
  return (
    <div>
      <h2 className={"text-3xl"}>Registration</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"flex flex-col items-center gap-2"}>
            <div>
              <label className={"inline-block w-[100px]"} htmlFor="email">
                Email
              </label>
              <input
                className={"border border-2 rounded-lg px-1"}
                type="email"
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <label className={"inline-block w-[100px]"} htmlFor="firstName">
                First name
              </label>
              <input
                className={"border border-2 rounded-lg px-1"}
                type="text"
                {...register("firstName")}
              />
            </div>
            <div>
              <label className={"inline-block w-[100px]"} htmlFor="lastName">
                Last name
              </label>
              <input
                className={"border border-2 rounded-lg px-1"}
                type="text"
                {...register("lastName")}
              />
            </div>
            <div>
              <label className={"inline-block w-[100px]"} htmlFor="password">
                Password
              </label>
              <input
                className={"border border-2 rounded-lg px-1"}
                type="password"
                {...register("password")}
              />
            </div>
            <div>
              <label className={"inline-block w-[100px]"} htmlFor="password">
                Confirm password
              </label>
              <input
                className={"border border-2 rounded-lg px-1"}
                type="password"
                {...register("confirmPassword")}
              />
            </div>
            <div className={"mt-4"}>
              <button
                className={"rounded-full py-1 px-3 bg-green-400"}
                type={"submit"}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>{isLoading && <span>Loading...</span>}</div>
    </div>
  );
};

export default RegistrationPage;

// interface InputFieldInterface {
//   label?: string;
// }
// const InputField = ({ label }: InputFieldInterface) => {
//   return (
//     <div>
//       <label className={"inline-block w-[100px]"} htmlFor="password">
//         {label}
//       </label>
//       <input
//         className={"border border-2 rounded-lg px-1"}
//         type="password"
//         {...register("confirmPassword")}
//       />
//     </div>
//   );
// };
