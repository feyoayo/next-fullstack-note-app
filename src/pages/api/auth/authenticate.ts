import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import {AuthenticateService} from "@/backend/services/auth.service";
import {DbConnectionService} from "@/backend/services/db-connection.service";

const authenticateRoute = createRouter<NextApiRequest, NextApiResponse>();

authenticateRoute.post(async (req, res) => {
  try {
    await new DbConnectionService().connectToDb()
    const service = new AuthenticateService()
    const body = req.body;
    const loginData = await service.authUser(body)
    res.status(200).json({ status: "Ok", ...loginData });
  } catch (e) {
    const error = e as Error
    res.status(400).json({error: error.message})
  }

});

export default authenticateRoute.handler();
