import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField/Input-field.component";
import {OutlineButton} from "@/components/ui/buttons";
import {useMutation} from "react-query";
import {AuthenticateService} from "@/ui-services/authenticate.service";
import {UserAuthInterface} from "@/types/auth";
import {toast} from "react-toastify";


const LoginPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<UserAuthInterface>();
  const { isLoading, mutateAsync} = useMutation(
      (data: UserAuthInterface) => AuthenticateService.authenticateUser(data), {
          onError: (error) => {
              toast.error((error as any)?.response?.data?.error ?? "Login failed", {
                  theme: "colored",
              });
          },
      })
  const onSubmit = async (data: UserAuthInterface) => {
      await mutateAsync(data)
  }
  return (
    <div>
      <div>
        <h1>Login</h1>
      </div>
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

export default LoginPage