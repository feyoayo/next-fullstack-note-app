import React, { useEffect, useState } from "react";
import { queryKeys } from "@/hooks/useTasks";
import update from "immutability-helper";
import TaskListItemComponent from "@/components/task-page/tasks-container/task-list-item.component";
import { TaskModelInterface } from "@/types/task";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { DRAG_TYPE } from "@/utils/constants";
import { useMutation, useQueryClient } from "react-query";
import { TaskService } from "@/services/task.service";
import classNames from "classnames";

interface Props {
  title: string;
  tasks: TaskModelInterface[];
}
const TaskContainerComponent = ({ tasks, title }: Props) => {
  const [taskState, setTaskState] = useState(tasks);
  const { mutateAsync } = useMutation((data: { column: string; id: string }) =>
    TaskService.updateTaskColumn(data)
  );
  const queryClient = useQueryClient();
  const [{ isOver }, drop] = useDrop({
    accept: DRAG_TYPE,
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggingColor: monitor.getItemType() as string,
    }),
    async drop(item: any) {
      if (item.column !== title) {
        await mutateAsync({ column: title, id: item._id });
        queryClient.invalidateQueries({ queryKey: [queryKeys.taskData] });
      }
    },
  });

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const dragTask = taskState[dragIndex];
    if (dragTask) {
      setTaskState(
        update(taskState, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragTask],
          ],
        })
      );
    }
  };

  useEffect(() => {
    setTaskState(tasks);
  }, [tasks]);

  return (
    <div ref={drop} className={"w-full mb-2 "}>
      <h5 className={"mb-2 text-slate-500 dark:text-slate-200"}>{title}</h5>
      <ul
        className={classNames(
          "min-h-[100px] transition-opacity   flex flex-col gap-2 text-sm p-2 box-border font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white",
          {
            ["bg-orange-200"]: isOver,
            ["border-black"]: isOver,
          }
        )}
      >
        {taskState.map((el, index) => (
          <TaskListItemComponent
            key={el._id}
            moveItem={moveItem}
            el={el}
            index={index}
            isOver={isOver}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskContainerComponent;
