import { ReactElement, useEffect, useState } from "react";
import { OutlineButton } from "@/components/ui/buttons";
import CreateTodoModal from "@/components/modals/create-todo-modal";
import MainLayout from "@/components/layouts/main.layout";
import { useRouter } from "next/router";
import useTodos from "@/hooks/useTodos";
import { GetServerSideProps } from "next";
import { DbConnectionService } from "@/backend/services/db-connection.service";
import { TodoModel } from "@/backend/models/todo.model";
import { ChipComponent } from "@/components/ui";

interface Props {
  tags: string[];
}
const TodosPage = ({ tags }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState("");
  const { todos } = useTodos({
    tag: selectedTag,
  });

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
        <div className={"w-2/3"}>
          <ul className=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {todos.map((el) => (
              <li
                onClick={() => router.push(`todos/${el._id}`)}
                key={el._id}
                className="cursor-pointer w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
              >
                {el.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
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
