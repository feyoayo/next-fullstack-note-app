import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DbConnectionService } from "@/backend/services/db-connection.service";
import { AuthenticateService } from "@/backend/services/auth.service";
import { EncryptPassword } from "@/backend/services/encrypt-password.service";
import Google from "next-auth/providers/google";
import { AccountTypes } from "@/types/auth";

export const NextAuthSecret = "SECRET_112233";

export default NextAuth({
  secret: NextAuthSecret,

  providers: [
    Google({
      clientId:
        "280716270863-06fq468tdcv3j8plqdcco548h2vrir0t.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) {
            throw new Error("Credentials needed");
          }
          const dbConnect = new DbConnectionService();
          const service = new AuthenticateService();
          const encryptPass = new EncryptPassword();

          await dbConnect.connectToDb();

          const user = await service.findUser(credentials.email, "credential");

          if (!user) {
            throw new Error("User not found");
          }

          const isPasswordRight = await encryptPass.comparePassword(
            user.password,
            credentials.password
          );

          if (!isPasswordRight) {
            throw new Error("Auth error");
          }
          return user as any;
        } catch (e) {
          console.log(e);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          const service = new AuthenticateService();
          await new DbConnectionService().connectToDb();
          await service.createGoogleUser(profile);
        } catch (e) {
          console.log(e);
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      await new DbConnectionService().connectToDb();
      const authService = new AuthenticateService();
      if (user) {
        const userFromDB = await authService.findUser(
          user.email!,
          account?.provider! as AccountTypes
        );
        token.user = {
          userId: userFromDB?.id,
          // @ts-ignore
          email: user.email,
          // @ts-ignore
          role: user.role ?? "USER",
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        // @ts-ignore
        session.user = token.user;
      }
      return session;
    },
  },
});
