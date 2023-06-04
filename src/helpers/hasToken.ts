import {GetServerSidePropsContext, NextApiRequest} from "next";
import {NextRequest} from "next/server";
import {getToken} from "next-auth/jwt";
import {NextAuthSecret} from "@/pages/api/auth/[...nextauth]";

export const hasToken = async (req: GetServerSidePropsContext["req"] | NextRequest | NextApiRequest) => {
    return  getToken({req, secret: NextAuthSecret});
}