/* eslint-disable @typescript-eslint/no-unused-vars */

import { mongoCartRepository } from "@/@core/backend/main/factories/repositories/cartRepositoryFactory"
import { externalJwtTokenService } from "@/@core/backend/main/factories/services/tokenServiceFactory"
import { dbExternalSigninUseCase } from "@/@core/backend/main/factories/usecases/auth/externalUser/dbExternalSigninFactory"
import { dbGuestAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/guestUser/dbGuestAuthorizationFactory"
import { dbAddProductsToCartUseCase } from "@/@core/backend/main/factories/usecases/cart/dbAddProductsToCartFactory"
import { dbClearCartUseCase } from "@/@core/backend/main/factories/usecases/cart/dbClearCartFactory"
import { NextApiRequest } from "next"
import { AuthOptions } from "next-auth"
import GoogleProvivder from "next-auth/providers/google"

const nextAuthSecretKey = process.env.EXTERNAL_SESSION_SECRET_KEY

export function generateNextAuthOptions(httpRequest: NextApiRequest): AuthOptions {
    const guestAccessToken = httpRequest.cookies["guest-access-token"] as string

    const nextAuthHandlerOptions: AuthOptions = {
        providers: [
            GoogleProvivder({
                clientId: process.env.GOOGLE_CLIENT_ID ?? "",
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
            })
        ],
        secret: nextAuthSecretKey,
        session: {
            strategy: "jwt",
            maxAge: 60
        },
        callbacks: {
            jwt: async ({ token, account }) => {
                //Gerando um accessToken após o login do usuário
                if (account) {
                    const clientAccessToken = await dbExternalSigninUseCase.execute({
                        name: token.name as string,
                        email: token.email as string,
                        image: token.picture || null
                    })
                    const { sub, picture, ...tokenRest } = token
                    const payload = externalJwtTokenService.decode(clientAccessToken)
                    const guestUser =
                        await dbGuestAuthorizationUseCase.execute(guestAccessToken)

                    const newSessionToken = {
                        ...tokenRest,
                        accessToken: clientAccessToken
                    }

                    if (!guestUser || !payload) {
                        return newSessionToken
                    }

                    const guestCart = await mongoCartRepository.getCartById(
                        guestUser.id,
                        "guest"
                    )

                    if (!guestCart) {
                        return newSessionToken
                    }

                    const itemsToAdd = guestCart.toJSON().items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))

                    await dbAddProductsToCartUseCase.execute(
                        { id: payload.id, type: payload.sessionType },
                        itemsToAdd
                    )
                    await dbClearCartUseCase.execute(guestUser.id, "guest")

                    return newSessionToken
                }
                //Retornando o token anterior nas chamadas subsequentes, contendo o accessToken gerado
                //anteriormente
                return token
            },
            session: async ({ session, token }) => {
                //Retornando apenas o acessToken para persistir no localStorage do usuário,
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
