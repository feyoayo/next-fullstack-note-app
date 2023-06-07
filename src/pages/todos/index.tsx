import { ReactElement, useEffect, useRef, useState } from "react";
import { OutlineButton } from "@/components/ui/buttons";
import CreateTodoModal from "@/components/modals/create-todo-modal";
import MainLayout from "@/components/layouts/main.layout";
import { useRouter } from "next/router";
import useTodos from "@/hooks/useTodos";
import { GetServerSideProps } from "next";
import { DbConnectionService } from "@/backend/services/db-connection.service";
import { TodoModel } from "@/backend/models/todo.model";
import { ChipComponent } from "@/components/ui";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TodoModelInterface } from "@/types/todo";
import classNames from "classnames";
import update from "immutability-helper";
import TaskContainerComponent from "@/components/task-page/tasks-container/task-container.component";
interface Props {
  tags: string[];
}
const TodosPage = ({ tags }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState("");

  const selectTagsHandler = (tag: string) => {
    if (tag === selectedTag) {
      setSelectedTag("");
      return;
    }
    setSelectedTag(tag);
  };

  useEffect(() => {
    router.push({
      pathname: "/todos",
      query: {
        tag: selectedTag,
      },
    });
  }, [selectedTag]);
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div className={"flex items-center gap-3 mb-3"}>
          <div>
            <p>Sort by tags:</p>
          </div>
          <div className={"flex"}>
            {tags.sort().map((el, index) => (
              <ChipComponent
                onClick={() => selectTagsHandler(el)}
                key={index}
                label={el}
              />
            ))}
          </div>
        </div>
        <div>
          <OutlineButton onClick={() => setShowModal(true)}>
            {"Create todo"}
          </OutlineButton>
          {showModal && <CreateTodoModal onClose={() => setShowModal(false)} />}
        </div>

        <div className={"flex w-full"}>
          <TaskContainerComponent selectedTag={selectedTag} />
        </div>
      </DndProvider>
    </div>
  );
};

TodosPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default TodosPage;

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  const dbService = new DbConnectionService();
  await dbService.connectToDb();
  const result = await TodoModel.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: null, tags: { $addToSet: "$tags" } } },
    { $project: { _id: 0, tags: 1 } },
  ]);
  return {
    props: {
      tags: result[0].tags,
    },
  };
};
