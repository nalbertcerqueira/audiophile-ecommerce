/* eslint-disable @typescript-eslint/no-unused-vars */

import { mongoCartRepository } from "@/@core/backend/main/factories/repositories/cartRepositoryFactory"
import { externalJwtTokenService } from "@/@core/backend/main/factories/services/tokenServiceFactory"
import { dbExternalSigninUseCase } from "@/@core/backend/main/factories/usecases/auth/externalUser/dbExternalSigninFactory"
import { dbGuestAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/guestUser/dbGuestAuthorizationFactory"
import { dbAddProductsToCartUseCase } from "@/@core/backend/main/factories/usecases/cart/dbAddProductsToCartFactory"
import { dbClearCartUseCase } from "@/@core/backend/main/factories/usecases/cart/dbClearCartFactory"
import { NextApiRequest } from "next"
import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

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

                //Gerando um accessToken após o login bem sucedido do usuário
                const clientAccessToken = await dbExternalSigninUseCase.execute({
                    name: token.name as string,
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
                    //Buscando o carrinho do usuário convidado (usuário anônimo)
                    const guestCart = await mongoCartRepository.getCartById({
                        userId: guestUser.id,
                        type: "guest"
                    })

                    if (guestCart) {
                        const itemsToAdd = guestCart.toJSON().items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity
                        }))

                        //Transferindo o carrinho do usuário convidado para o usuário recem autenticado
                        await dbAddProductsToCartUseCase.execute(
                            { userId: payload.id, type: payload.sessionType },
                            itemsToAdd
                        )
                        await dbClearCartUseCase.execute(guestUser.id, "guest")
                    }
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
