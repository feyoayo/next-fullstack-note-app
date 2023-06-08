import React, { useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import classNames from "classnames";
import { TaskModelInterface } from "@/types/task";
import { DRAG_TYPE } from "@/utils/constants";
import high from "../../../../public/svg/high.svg";
import medium from "../../../../public/svg/medium.svg";
import low from "../../../../public/svg/low.svg";
import dragIcon from "../../../../public/svg/drag.svg";
import { ROUTES } from "@/utils/constants/routes";

interface Props {
  el: TaskModelInterface;
  index: number;
  moveItem: any;
  isOver?: boolean;
}
const TaskListItemComponent = ({ moveItem, el, index, isOver }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPE,
    item: { type: DRAG_TYPE, index, ...el },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [_, drop] = useDrop({
    accept: DRAG_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      // @ts-ignore
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset?.y! - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // @ts-ignore
      item.index = hoverIndex;
    },
  });
  console.log(el);

  drag(drop(ref));
  return (
    <div
      ref={ref}
      onClick={() => router.push(ROUTES.TASK_PAGE(el._id!))}
      className={classNames(
        "flex transition-all duration-150 items-center animate-transition box-border hover:bg-gray-300 gap-2 cursor-move w-full px-4 py-2 border border-gray-200 rounded-lg dark:border-gray-600 hover:dark:text-slate-900 delay-[50ms]",
        {
          ["opacity-40"]: isDragging,
          ["text-opacity-100"]: !isDragging,
          ["border-slate-900"]: isOver,
        }
      )}
    >
      <div>
        <Image width={13} src={dragIcon} alt={"Drag icon"} />
      </div>
      <div title={`Priority: ${el.priority}`}>
        {el.priority === "High" && (
          <Image width={13} src={high} alt={el.priority} />
        )}
        {el.priority === "Medium" && (
          <Image width={13} src={medium} alt={el.priority} />
        )}
        {el.priority === "Low" && (
          <Image width={13} src={low} alt={el.priority} />
        )}
      </div>
      <div
        title={`Estimate: ${el.estimate}`}
        className={
          "flex items-center justify-center border p-1 rounded-md border-gray-400 bg-slate-300 dark:text-slate-800 text-[8px] h-3"
        }
      >
        {el.estimate}
      </div>
      <div>{el.title}</div>
    </div>
  );
};

export default TaskListItemComponent;
