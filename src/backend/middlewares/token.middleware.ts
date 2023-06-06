import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextAuthSecret } from "@/pages/api/auth/[...nextauth]";

async function tokenMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) {
  const token = await getToken({ req, secret: NextAuthSecret });
  if (!token) {
    return next(new Error("Authorization required"));
  }
  req.user = token.user;
  next();
}
export default tokenMiddleware;
