import React, { useEffect, useState } from "react";
import useTodos from "@/hooks/useTodos";
import update from "immutability-helper";
import TaskListItemComponent from "@/components/task-page/tasks-container/task-list-item.component";

interface Props {
  selectedTag: string;
}
const TaskContainerComponent = ({ selectedTag }: Props) => {
  const { todos } = useTodos({
    tag: selectedTag,
  });
  const [taskState, setTaskState] = useState(todos);

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
    setTaskState(todos);
  }, [todos]);

  return (
    <div className={"w-2/3"}>
      <ul className="flex flex-col gap-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {taskState.map((el, index) => (
          <TaskListItemComponent
            key={el._id}
            moveItem={moveItem}
            el={el}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskContainerComponent;
