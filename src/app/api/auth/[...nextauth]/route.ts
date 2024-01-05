import { nextAuthHandlerOptions } from "@/libs/next-auth/handler"
import NextHandler from "next-auth"

const handler = NextHandler(nextAuthHandlerOptions)

export { handler as GET, handler as POST }
