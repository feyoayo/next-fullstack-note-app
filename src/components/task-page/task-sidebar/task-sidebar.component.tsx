import { Label } from "@/components/ui";
import CloseButtonComponent from "@/components/ui/buttons/close-button.component";
import SelectComponent from "@/components/ui/input/select.component";
import useTaskSidebar from "@/stores/task-sidebar";
import classNames from "classnames";

interface Props {
  columns: string[];
}
const TaskSidebarComponent = ({ columns }: Props) => {
  const { selectedTask, closeSidebar } = useTaskSidebar();
  return (
    <div
      className={classNames(
        "flex overflow-auto flex-col p-5 border-l ml-2 h-full "
      )}
    >
      <div className={"flex justify-end w-full"}>
        <CloseButtonComponent onClick={closeSidebar} />
      </div>

      <div className={"flex flex-col gap-3"}>
        <div className={"mb-2"}>
          <h5 className={"font-bold text-xl"}>{selectedTask?.title}</h5>
        </div>
        <div className={"mb-2"}>
          <Label htmlFor={""} label={"Estimate:"} />
          <span>{selectedTask?.estimate}</span>
        </div>
        <div>
          <Label htmlFor={""} label={"Priority:"} />
          {/*// @ts-ignore*/}
          <SelectComponent name={"priority"} register={() => {}}>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </SelectComponent>
        </div>
        <div>
          <Label htmlFor={""} label={"Status:"} />
          {/*// @ts-ignore*/}
          <SelectComponent name={"status"} register={() => {}}>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </SelectComponent>
        </div>
      </div>
    </div>
  );
};

export default TaskSidebarComponent;
