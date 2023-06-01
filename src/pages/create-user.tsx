import { User } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";

const CreateUser = () => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    getData().then((r) => {
      setUserList(r.users);
    });
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const payload = {
      name,
      email,
    };
    await createUser(payload);
    await getData();
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input name={"email"} type="email" placeholder={"Email"} />
          <input name={"name"} type="text" placeholder={"Name"} />
          <button type={"submit"}>Create user</button>
        </form>
      </div>
      <div>
        {userList?.map((el) => (
          <div key={el.id}>
            <span>{el.name}</span>
            <span>|</span>
            <span>{el.email}</span>
          </div>
        ))}
      </div>
    </>
  );
};

async function getData(): Promise<{ users: User[] }> {
  const data = await fetch("/api/user");
  return data.json();
}
async function createUser(payload: Record<string, string>) {
  await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default CreateUser;
