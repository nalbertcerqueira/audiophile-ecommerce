import { generateNextAuthOptions } from "@/libs/next-auth/handler"
import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    const authOptions = generateNextAuthOptions(req)

    return await NextAuth(req, res, authOptions)
}
