import InputField from "@/components/ui/InputField/Input-field.component";
import { OutlineButton } from "@/components/ui/buttons";
import useRegistration from "@/hooks/auth/useRegistration";
import { UserInterface } from "@/types/auth";

import { useForm } from "react-hook-form";

interface RegistrationField {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<RegistrationField>();
  const { isLoading, registerUser } = useRegistration();
  const onSubmit = (data: UserInterface) => {
    console.log(data);
    const { email, firstName, lastName, password } = data;
    const payload: UserInterface = {
      email,
      firstName,
      lastName,
      password,
    };
    registerUser(payload);
    reset();
  };

  return (
    <div>
      <h2 className={"text-3xl"}>Registration</h2>
      <div>
        <form
          className={"flex justify-center"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={"flex flex-col items-center gap-2 w-[500px]"}>
            <InputField
              validationSchema={{
                required: true,
              }}
              errors={errors}
              required={true}
              name={"email"}
              label={"Email"}
              register={register}
              type={"email"}
            />
            <InputField
              required={true}
              name={"firstName"}
              label={"First Name"}
              type={"text"}
              register={register}
              errors={errors}
              validationSchema={{
                required: true,
              }}
            />
            <InputField
              name={"lastName"}
              label={"Last Name"}
              type={"text"}
              register={register}
              errors={errors}
            />
            <InputField
              required={true}
              name={"password"}
              label={"Password"}
              type={"password"}
              register={register}
              errors={errors}
              validationSchema={{
                required: {
                  value: true,
                  message: "Field is required",
                },
                minLength: {
                  value: 8,
                  message: "Min 8 chars needed",
                },
              }}
            />
            <InputField
              required={true}
              name={"confirmPassword"}
              label={"Confirm password"}
              type={"password"}
              register={register}
              errors={errors}
              validationSchema={{
                required: {
                  value: true,
                  message: "Field is required",
                },
                minLength: {
                  value: 8,
                  message: "Min 8 chars needed",
                },
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do not match";
                  }
                },
              }}
            />
            <div className={"mt-4"}>
              <OutlineButton type={"submit"} isLoading={isLoading}>
                Registration
              </OutlineButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;