import React, { useRef } from "react";
import { useRouter } from "next/router";
import { useDrag, useDrop } from "react-dnd";
import classNames from "classnames";
import { TaskModelInterface } from "@/types/task";

interface Props {
  el: TaskModelInterface;
  index: number;
  moveItem: any;
}
const TaskListItemComponent = ({ moveItem, el, index }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const DRAG_TYPE = "item";
  const router = useRouter();
  const [{ isDragging }, drag, preview] = useDrag({
    type: DRAG_TYPE,
    item: { type: DRAG_TYPE, index },
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

  drag(drop(ref));
  return (
    <div
      ref={ref}
      onClick={() => router.push(`todos/${el._id}`)}
      className={classNames(
        "flex hover:bg-gray-300 gap-2 cursor-pointer w-full px-4 py-2 border-b border-t border-gray-200 rounded-lg dark:border-gray-600",
        {
          ["opacity-40"]: isDragging,
          ["text-opacity-100"]: !isDragging,
        }
      )}
    >
      {el.title}
    </div>
  );
};

export default TaskListItemComponent;
