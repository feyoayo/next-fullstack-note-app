import { NextApiResponse } from "next";

export abstract class BaseController {
  public created<T>(res: NextApiResponse, data: T) {
    res.status(201).json({ status: true, message: "Created", data });
  }
  public errorMessage(e: unknown, res: NextApiResponse, statusCode = 400) {
    const error = e as Error;
    console.log(error);
    res.status(statusCode).json({ status: false, message: error.message });
  }

  public ok<T>(res: NextApiResponse, data: T) {
    res.status(200).json({ status: true, data });
  }
}
