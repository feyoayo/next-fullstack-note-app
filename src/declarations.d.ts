import { UserTokenData } from "@/types/auth";

declare module "next-auth/jwt" {
  interface JWT {
    user: UserTokenData;
  }
}

declare module "next" {
  interface NextApiRequest {
    user: UserTokenData;
  }
}
