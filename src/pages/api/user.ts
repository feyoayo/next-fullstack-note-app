import { UserService } from "@/services/users.service";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const userRoute = createRouter<NextApiRequest, NextApiResponse>();

userRoute.get(async (req, res) => {
  const userService = new UserService();

  const users = await userService.getUsers();
  res.status(200).json({ users });
});

userRoute.post(async (req, res) => {
  const userService = new UserService();

  const { email, name } = req.body;
  const user = await userService.createUser(email, name);
  res.status(200).json({ user });
});

export default userRoute.handler({
  onError: (err, req, res) => {
    const error = err as any;
    console.error(error.stack);
    res.status(error.statusCode || 500).end(error.message);
  },
});
