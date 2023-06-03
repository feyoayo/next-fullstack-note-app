import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import {AuthenticateController} from "@/backend/controllers/authenticate.controller";

const loginRouter = createRouter<NextApiRequest, NextApiResponse>();

loginRouter.post(async (req, res) => {
  const loginController = new AuthenticateController()
  await loginController.login(req, res)
});

export default loginRouter.handler();
