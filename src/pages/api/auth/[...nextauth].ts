import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {DbConnectionService} from "@/backend/services/db-connection.service";
import {AuthenticateService} from "@/backend/services/auth.service";
import {EncryptPassword} from "@/backend/services/encrypt-password.service";

export default NextAuth({
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            authorize: async (credentials) => {
                if(!credentials){throw  new Error('Credentials needed')}
                const dbConnect = new DbConnectionService()
                const service = new AuthenticateService()
                const encryptPass = new EncryptPassword()

                await dbConnect.connectToDb()

                const user = await service.findUser(credentials.email)

                if(!user) {throw new Error('User not found')}

                const isPasswordRight = await encryptPass.comparePassword(user.password, credentials.password)

                if(!isPasswordRight) {throw  new Error('Auth error')}
                return user as any
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.user = {
                    email: user.email,
                    // @ts-ignore
                    role: user.role
                }
            }
            return token
        },
        session: async({session, token}) => {
            if(token){
                // @ts-ignore
                session.user = token.user
            }
            return session
        }
    },
})