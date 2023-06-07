import React, { ReactElement } from "react";
import MainLayout from "@/components/layouts/main.layout";
import { useRouter } from "next/router";
import { DbConnectionService } from "@/backend/services/db-connection.service";
import { GetServerSideProps } from "next";
import { TodoModel } from "@/backend/models/todo.model";
import { TaskModelInterface } from "@/types/todo";

interface Props {
  task: TaskModelInterface;
}
const TodoPage = ({ task }: Props) => {
  const router = useRouter();
  return (
    <div>
      <div
        className={"cursor-pointer text-blue-600 font-bold"}
        onClick={router.back}
      >
        {"<--"} Back
      </div>
      <div>Title: {task.title}</div>
      <div>Created: {String(new Date(task.createdAt))}</div>
      <div>
        Tags:{" "}
        {task.tags.map((el, index) => (
          <span key={index}>{el + " "} </span>
        ))}
      </div>
    </div>
  );
};

TodoPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TodoPage;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const id = context.query.id;
  const dbService = new DbConnectionService();
  await dbService.connectToDb();
  const item = await TodoModel.findById(id);
  return {
    props: {
      task: JSON.parse(JSON.stringify(item)),
    },
  };
};
