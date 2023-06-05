import { ReactElement, useState } from "react";
import MainLayout from "@/components/layouts/main.layout";
import { OutlineButton } from "@/components/ui/buttons";
import CreateTodoModal from "@/components/modals/create-todo-modal";
import { useForm } from "react-hook-form";

const TodosPage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div>
        <OutlineButton onClick={() => setShowModal(true)}>
          Create todo
        </OutlineButton>
        {showModal && <CreateTodoModal onClose={() => setShowModal(false)} />}
      </div>

      <div className={"flex justify-center w-full"}>
        <div className={"w-2/3"}>
          <ul className=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              Profile
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              Settings
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              Messages
            </li>
            <li className="w-full px-4 py-2 rounded-b-lg">Download</li>
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
