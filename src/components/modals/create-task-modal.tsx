import CloseIconSvg from "@/components/svg/closeIcon.svg";
import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField/Input-field.component";
import { OutlineButton } from "@/components/ui/buttons";
import { useState } from "react";
import { ChipComponent, InputComponent, Label } from "@/components/ui";
import { TaskModelInterface } from "@/types/task";
import useTasks from "@/hooks/useTasks";
import SelectComponent from "@/components/ui/input/select.component";

interface TodoModalProps {
  onClose: () => void;
}
interface Form extends TaskModelInterface {}
const CreateTaskModal = ({ onClose }: TodoModalProps) => {
  const {
    watch,
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm<Form>({
    defaultValues: {
      tags: [],
      priority: "Medium",
      estimate: 0,
    },
  });
  const [tagValue, setTagValue] = useState("");

  const { isCreationLoading, createTask } = useTasks({});
  const onAddTag = () => {
    setValue("tags", watch("tags").concat(tagValue));
    setTagValue("");
  };
  const onDeleteTag = (elIndex: number) => {
    const tags = watch("tags");
    const newTags = tags.filter((el, index) => index !== elIndex);
    setValue("tags", newTags);
  };

  const onSubmit = async (data: Form) => {
    await createTask(data);
    reset();
  };
  return (
    <div
      id="create_modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed flex justify-center items-center  top-1/2 left-1/2 right-1/2 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full animate-transition"
    >
      <div
        className={"absolute opacity-70 bg-black h-full w-full"}
        onClick={onClose}
      />
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
              {"Create task"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name={"title"}
                type={"text"}
                required
                register={register}
                label={"Task name"}
                errors={errors}
                validationSchema={{
                  required: true,
                }}
              />
              <div>
                <Label htmlFor={"priority"} label={"Priority"} />

                <SelectComponent
                  register={register}
                  name={"priority"}
                  validationSchema={{ required: true }}
                >
                  <option value={"Low"}>Low</option>
                  <option value={"Medium"}>Medium</option>
                  <option value={"High"}>High</option>
                </SelectComponent>
              </div>

              <div>
                <Label
                  htmlFor={"estimate"}
                  label={"Estimate"}
                  {...register("estimate")}
                />
                <InputField
                  name={"estimate"}
                  type={"number"}
                  register={register}
                  min={0}
                />
              </div>

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

                <OutlineButton type={"button"} onClick={() => onAddTag()}>
                  Add
                </OutlineButton>
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
                <OutlineButton isLoading={isCreationLoading} type={"submit"}>
                  Create
                </OutlineButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
