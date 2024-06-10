/* eslint-disable @typescript-eslint/no-unused-vars */

import { externalJwtTokenService } from "@/@core/backend/main/factories/services/tokenServiceFactory"
import { dbExternalSigninUseCase } from "@/@core/backend/main/factories/usecases/auth/externalUser/dbExternalSigninFactory"
import { dbGuestAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/guestUser/dbGuestAuthorizationFactory"
import { NextApiRequest } from "next"
import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { dbMoveCartItemsUseCase } from "@/@core/backend/main/factories/usecases/cart/dbMoveCartItemsFactory"
import { dbGetCartUseCase } from "@/@core/backend/main/factories/usecases/cart/dbGetCartFactory"

const nextAuthSecretKey = process.env.NEXTAUTH_SECRET

export function generateNextAuthOptions(httpRequest: NextApiRequest): AuthOptions {
    const guestAccessToken = httpRequest.cookies["guest-access-token"] as string

    const nextAuthHandlerOptions: AuthOptions = {
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID ?? "",
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
            }),
            GithubProvider({
                clientId: process.env.GITHUB_CLIENT_ID ?? "",
                clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
            })
        ],
        secret: nextAuthSecretKey,
        pages: {
            signIn: "/signin"
        },
        session: {
            strategy: "jwt",
            maxAge: 60
        },
        callbacks: {
            jwt: async ({ token, account }) => {
                if (!account) return token
                const [firstName, ...rest] = (token.name as string).split(/ |-/)

                //Gerando um accessToken após o login bem sucedido do usuário
                const clientAccessToken = await dbExternalSigninUseCase.execute({
                    firstName,
                    lastName: rest.join(" ") || " ",
                    email: token.email as string,
                    image: token.picture || null
                })
                const { sub, picture, ...tokenRest } = token
                const payload = externalJwtTokenService.decode(clientAccessToken)
                const guestUser = await dbGuestAuthorizationUseCase.execute(guestAccessToken)

                const newSessionToken = {
                    ...tokenRest,
                    accessToken: clientAccessToken
                }

                if (guestUser && payload) {
                    const { id, sessionType } = payload

                    //Buscando o carrinho do usuário convidado (usuário anônimo)
                    const guestCart = await dbGetCartUseCase.execute(guestUser.id, "guest")
                    const itemsToAdd = guestCart.toJSON().items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))

                    //Transferindo o carrinho do usuário convidado para o usuário recém autenticado
                    await dbMoveCartItemsUseCase.execute({
                        from: { id: guestUser.id, type: "guest" },
                        to: { id: id, type: sessionType },
                        items: itemsToAdd
                    })
                }
                return newSessionToken
            },
            session: async ({ session, token }) => {
                //Retornando apenas o accessToken que será persistido no localStorage do usuário,
                //juntamente com o expires, pois é obrigatório
                return {
                    expires: session.expires,
                    accessToken: token.accessToken
                }
            }
        }
    }

    return nextAuthHandlerOptions
}
