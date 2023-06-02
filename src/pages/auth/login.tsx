import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField/Input-field.component";
import {OutlineButton} from "@/components/ui/buttons";
import {useMutation} from "react-query";
import {AuthenticateService} from "@/services/authenticate.service";
import {UserAuthInterface} from "@/types/auth";
import {toast} from "react-toastify";
import {TOKEN_LOCALSTORAGE_KEY} from "@/utils/constants";
import {useRouter} from "next/router";
import AuthLayout from "@/components/layouts/auth.layout";
import {ReactElement} from "react";
import {NextPageWithLayout} from "@/types/util";


const LoginPage: NextPageWithLayout = () => {
    const router = useRouter();
  const {register, handleSubmit, formState: {errors}} = useForm<UserAuthInterface>();
  const { isLoading, mutateAsync, data: resData} = useMutation(
      (data: UserAuthInterface) => AuthenticateService.authenticateUser(data), {
          onError: (error) => {
              toast.error((error as any)?.response?.data?.error ?? "Login failed", {
                  theme: "colored",
              });
          },
      })
  const onSubmit = async (data: UserAuthInterface) => {
      await mutateAsync(data)
      if(resData) {
          localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, resData.data.token)
          await router.push('/')
      }
  }




  return (
    <div>
        <div className={'flex justify-center'}>
            <form className={'flex flex-col gap-2 w-1/3'} onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    name={'email'}
                    type={'email'}
                    errors={errors}
                    label={'Email'}
                    required
                    register={register}
                />
                <InputField
                    name={'password'}
                    type={'password'}
                    errors={errors}
                    label={'Password'}
                    required
                    register={register}
                />
                <div className={"mt-4"}>
                    <OutlineButton isLoading={isLoading} type={'submit'} >Login</OutlineButton>
                </div>
            </form>
        </div>
    </div>
  );
};


LoginPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout>
            {page}
        </AuthLayout>
    )
}

export default LoginPage

