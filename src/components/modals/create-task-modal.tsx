import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField/Input-field.component";
import { OutlineButton } from "@/components/ui/buttons";
import { useState } from "react";
import { ChipComponent, InputComponent, Label } from "@/components/ui";
import { TaskModelInterface } from "@/types/task";
import useTasks from "@/hooks/useTasks";
import SelectComponent from "@/components/ui/input/select.component";
import Modal from "@/components/ui/modal";

const MODAL_TITLE = "Create task";

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
    <Modal onClose={onClose} title={MODAL_TITLE}>
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
    </Modal>
  );
};

export default CreateTaskModal;
