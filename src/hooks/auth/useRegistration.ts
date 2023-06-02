import { UserInterface } from "@/types/auth";
import { AxiosError } from "@/types/error";
import { AuthenticateService } from "@/services/authenticate.service";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export default function useRegistration() {
  const { mutate, isLoading, isSuccess } = useMutation<any, AxiosError, any>(
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

  const router = useRouter();
  const registerUser = async (payload: UserInterface) => {
    await mutate(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => router.push("/auth/login"), 5000);
    }
  }, [isSuccess, router]);

  return {
    registerUser,
    isLoading,
  };
}
