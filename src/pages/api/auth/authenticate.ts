import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const authenticateRoute = createRouter<NextApiRequest, NextApiResponse>();

authenticateRoute.post(async (req, res) => {
  const body = req.body;
  res.status(200).json({ status: "Ok", message: "User authenticated" });
});

export default authenticateRoute.handler();
