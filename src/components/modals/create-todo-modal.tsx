import CloseIconSvg from "@/components/svg/closeIcon.svg";
import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField/Input-field.component";
import { Button } from "react-query/types/devtools/styledComponents";
import { OutlineButton } from "@/components/ui/buttons";
import { useState } from "react";
import { ChipComponent, InputComponent, Label } from "@/components/ui";

interface Form {
  todo: string;
  tags: string[];
  date: Date;
}

interface TodoModalProps {
  onClose: () => void;
}
const CreateTodoModal = ({ onClose }: TodoModalProps) => {
  const {
    watch,
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<Form>({
    defaultValues: {
      tags: [],
    },
  });
  const [tagValue, setTagValue] = useState("");
  const onAddTag = () => {
    setValue("tags", watch("tags").concat(tagValue));
    setTagValue("");
  };
  const onDeleteTag = (elIndex: number) => {
    const tags = watch("tags");
    const newTags = tags.filter((el, index) => index !== elIndex);
    setValue("tags", newTags);
  };

  const onSubmit = (data: Form) => {};
  return (
    <div
      id="create_modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed flex justify-center items-center  top-1/2 left-1/2 right-1/2 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className={"absolute opacity-70 bg-black h-full w-full"} />
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
              {"Create todo"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name={"todo"}
                type={"text"}
                required
                register={register}
                label={"What do you want to do ?"}
                errors={errors}
                validationSchema={{
                  required: true,
                }}
              />

              <InputField
                name={"when"}
                type={"date"}
                register={register}
                label={"When ?"}
              />
              <div>
                <Label htmlFor={"tag"} label={"Tags"} />
              </div>
              <div className={"flex justify-between"}>
                <div className={"w-3/4"}>
                  <InputComponent
                    name={"tag"}
                    value={tagValue}
                    onChange={(e) => setTagValue(e.target.value)}
                    type="text"
                  />
                </div>

                <OutlineButton onClick={() => onAddTag()}>Add</OutlineButton>
              </div>

              <div className="px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg bg-purple-200 dark:bg-gray-400">
                {watch("tags").map((el, index) => (
                  <ChipComponent
                    onDelete={() => onDeleteTag(index)}
                    key={index}
                    label={el}
                  />
                ))}
              </div>
              <div className={"flex justify-center"}>
                <OutlineButton type={"submit"}>Create</OutlineButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTodoModal;
