import { generateNextAuthOptions } from "@/libs/next-auth/handler"
import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

//Utilizei o 'pages router' do Next.js pois atualmente a lib next-auth não oferece suporte
//para acessar a request antes de executar a função NextAuth com o 'app router'
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    const authOptions = generateNextAuthOptions(req)

    return await NextAuth(req, res, authOptions)
}
