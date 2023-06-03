import {NextApiResponse} from "next";

export abstract class BaseController {
    public send<T>(res: NextApiResponse,data: T){
        res.status(200).json({status: true, data})
    }
}