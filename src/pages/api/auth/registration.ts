import { DbConnectionService } from "@/backend/services/db-connection.service";
import { UserInterface } from "@/types/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { AuthenticateService } from "@/backend/services/auth.service";

const registrationRoute = createRouter<NextApiRequest, NextApiResponse>();

registrationRoute.post(async (req, res) => {
  try {
    const connection = new DbConnectionService();
    await connection.connectToDb();
    const payload = req.body as UserInterface;

    const authService = new AuthenticateService();
    const user = await authService.createUser(payload);
    await connection.disconnectFromDb;
    res.status(200).json({ status: "Ok", message: "User created", user });
  } catch (e) {
    const error = e as Error;
    console.log(e);
    res.status(400).json({ status: false, error: error.message });
  }
});

export default registrationRoute.handler();
