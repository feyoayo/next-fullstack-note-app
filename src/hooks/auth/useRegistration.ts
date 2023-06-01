import { UserInterface } from "@/types/auth";
import { AxiosError } from "@/types/error";
import { AuthenticateService } from "@/ui-services/authenticate.service";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export default function useRegistration() {
  const { mutate, isLoading, error } = useMutation<any, AxiosError, any>(
    (data: UserInterface) => AuthenticateService.registerUser(data),
    {
      onSuccess: () => {
        toast.success("User created successfully");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error ?? "Registration failed", {
          theme: "colored",
        });
      },
    }
  );

  const registerUser = (payload: UserInterface) => {
    mutate(payload);
  };

  return {
    registerUser,
    isLoading,
  };
}
