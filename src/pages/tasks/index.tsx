import { ReactElement, useEffect, useState } from "react";
import { OutlineButton } from "@/components/ui/buttons";
import CreateTaskModal from "@/components/modals/create-task-modal";
import MainLayout from "@/components/layouts/main.layout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { DbConnectionService } from "@/backend/services/db-connection.service";
import { TodoModel } from "@/backend/models/todo.model";
import { ChipComponent } from "@/components/ui";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskContainerComponent from "@/components/task-page/tasks-container/task-container.component";
import { TaskColumnsModel } from "@/backend/models/task-columns.model";
import { getToken } from "next-auth/jwt";
import { NextAuthSecret } from "@/pages/api/auth/[...nextauth]";
import { ObjectId } from "bson";
import useTasks from "@/hooks/useTasks";
import classNames from "classnames";
import { ROUTES } from "@/utils/constants/routes";
import TaskSidebarComponent from "@/components/task-page/task-sidebar/task-sidebar.component";
import useTaskSidebar from "@/stores/task-sidebar";

interface Props {
  tags: string[];
  columns: string[];
}
const TodosPage = ({ tags, columns }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState("");
  const { tasks } = useTasks({
    tag: selectedTag,
  });
  const { isOpened: isSidebarOpened } = useTaskSidebar();

  const selectTagsHandler = (tag: string) => {
    if (tag === selectedTag) {
      setSelectedTag("");
      return;
    }
    setSelectedTag(tag);
  };

  useEffect(() => {
    router.push({
      pathname: ROUTES.TASKS_PAGE,
      query: {
        tag: selectedTag,
      },
    });
  }, [selectedTag]);
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div
          className={classNames("flex items-center gap-3 mb-3", {
            ["hidden"]: !tags?.length,
          })}
        >
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
            {"Create task"}
          </OutlineButton>
          {showModal && <CreateTaskModal onClose={() => setShowModal(false)} />}
        </div>

        <div className={"flex w-full"}>
          <div
            className={classNames(
              "transition-all max-h-[80vh] overflow-y-scroll",
              {
                ["w-full"]: !isSidebarOpened,
                ["hidden md:block md:w-2/3"]: isSidebarOpened,
              }
            )}
          >
            {columns.map((column, index) => (
              <TaskContainerComponent
                key={index}
                tasks={tasks.filter((el) => el.column === column)}
                title={column}
              />
            ))}
          </div>
          <div
            className={classNames("transition-all", {
              ["hidden w-0"]: !isSidebarOpened,
              ["w-full md:w-1/3"]: isSidebarOpened,
            })}
          >
            <TaskSidebarComponent columns={columns} />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

TodosPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default TodosPage;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const dbService = new DbConnectionService();
  const token = await getToken({ req: context.req, secret: NextAuthSecret });
  const userId = token?.user.userId;
  await dbService.connectToDb();
  const result = await TodoModel.aggregate([
    { $match: { userId: new ObjectId(userId) } },
    { $unwind: "$tags" },
    { $group: { _id: null, tags: { $addToSet: "$tags" } } },
    { $project: { _id: 0, tags: 1 } },
  ]);
  const columns = await TaskColumnsModel.findOne({
    userId,
  });
  return {
    props: {
      tags: result[0]?.tags ?? [],
      columns: columns?.taskColumns ?? [],
    },
  };
};
