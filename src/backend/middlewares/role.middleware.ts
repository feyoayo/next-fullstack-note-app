import {getToken} from "next-auth/jwt";
import {NextApiRequest, NextApiResponse} from "next";

export const isAdminMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const token = await getToken({ req, secret: '' }) as {user: {email: string, role: string}}
    if(!token || token.user.role !== 'admin'){
        return next(new Error('Not Allowed - Not admin'))
    }
    next()
}