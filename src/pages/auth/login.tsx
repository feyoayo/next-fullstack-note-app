import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField/Input-field.component";
import {GoogleButton, OutlineButton} from "@/components/ui/buttons";
import {useMutation} from "react-query";
import {AuthenticateService} from "@/services/authenticate.service";
import {UserAuthInterface} from "@/types/auth";
import {toast} from "react-toastify";
import AuthLayout from "@/components/layouts/auth.layout";
import {ReactElement} from "react";
import {NextPageWithLayout} from "@/types/util";
import {signIn} from "next-auth/react";
import {HOME_PAGE} from "@/utils/constants/routes";


const LoginPage: NextPageWithLayout = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<UserAuthInterface>();
  const { isLoading} = useMutation(
      (data: UserAuthInterface) => AuthenticateService.authenticateUser(data), {
          onError: (error) => {
              toast.error((error as any)?.response?.data?.error ?? "Login failed");
          },
      })
  const onSubmit = async (data: UserAuthInterface) => {
      // mutateAsync(data).then(r => localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, r.data.token))
      await signIn('credentials', {
          callbackUrl: HOME_PAGE,
          email: data.email,
          password: data.password
      })
  }
  return (
        <div className={'flex h-full mt-[200px] justify-center'}>
            <form className={'flex flex-col gap-2 w-1/3'} onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    name={'email'}
                    type={'email'}
                    errors={errors}
                    label={'Email'}
                    required
                    register={register}
                    validationSchema={{
                        required: true
                    }}
                />
                <InputField
                    name={'password'}
                    type={'password'}
                    errors={errors}
                    label={'Password'}
                    required
                    register={register}
                    validationSchema={{
                        required: true,

                    }}
                />
                <div className={"mt-4 flex flex-col"}>
                    <div>
                        <OutlineButton
                            className={'w-full'}
                            isLoading={isLoading} type={'submit'}>
                            <div
                            >
                                Login
                            </div>
                        </OutlineButton>

                    </div>
                    <GoogleButton/>
                </div>
            </form>
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


