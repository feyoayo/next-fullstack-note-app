import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import {AuthenticateController} from "@/backend/controllers/authenticate.controller";

const registrationRoute = createRouter<NextApiRequest, NextApiResponse>();

registrationRoute.post(async (req, res) => {
  const authController = new AuthenticateController()
  await authController.registration(req, res)
});

export default registrationRoute.handler();
