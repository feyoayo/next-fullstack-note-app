import {DbConnectionService} from "@/backend/services/db-connection.service";
import {AuthenticateService} from "@/backend/services/auth.service";
import {NextApiRequest, NextApiResponse} from "next";
import {UserInterface} from "@/types/auth";

export class AuthenticateController {
    db: DbConnectionService
    loginService: AuthenticateService
    constructor() {
        this.db = new DbConnectionService()
        this.loginService = new AuthenticateService()
    }
    public async registration(req: NextApiRequest, res: NextApiResponse) {
        try {
            await this.db.connectToDb()
            const payload = req.body as UserInterface;
            const user = await this.loginService.createUser(payload);
            res.status(200).json({ status: "Ok", message: "User created", user });
        } catch (e) {
            const error = e as Error;
            res.status(400).json({ status: false, error: error.message });
        }
    }
    public async login(req: NextApiRequest, res: NextApiResponse) {
        try {
            await this.db.connectToDb()
            const body = req.body;
            const loginData = await this.loginService.authUser(body)
            res.status(200).json({ status: "Ok", ...loginData });
        } catch (e) {
            const error = e as Error
            res.status(400).json({error: error.message})
        }
    }
}