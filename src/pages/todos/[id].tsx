import React, { ReactElement } from "react";
import MainLayout from "@/components/layouts/main.layout";
import { useRouter } from "next/router";
import { DbConnectionService } from "@/backend/services/db-connection.service";
import { GetServerSideProps } from "next";
import { TodoModel } from "@/backend/models/todo.model";
import { TodoModelInterface } from "@/types/todo";

interface Props {
  todo: TodoModelInterface;
}
const TodoPage = ({ todo }: Props) => {
  const router = useRouter();
  return (
    <div>
      <div
        className={"cursor-pointer text-blue-600 font-bold"}
        onClick={router.back}
      >
        {"<--"} Back
      </div>
      <div>Title: {todo.title}</div>
      <div>Completed: {String(todo.completed)}</div>
      <div>Created: {String(new Date(todo.createdAt))}</div>
      <div>
        Tags:{" "}
        {todo.tags.map((el, index) => (
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
      todo: JSON.parse(JSON.stringify(item)),
    },
  };
};
