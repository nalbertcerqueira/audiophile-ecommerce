/* eslint-disable @typescript-eslint/no-unused-vars */

import { dbExternalSigninUseCase } from "@/@core/backend/main/factories/usecases/auth/externalUser/dbExternalSigninFactory"
import { CallbacksOptions } from "next-auth"
import { AuthOptions } from "next-auth"
import GoogleProvivder from "next-auth/providers/google"

const nextAuthSecretKey = process.env.EXTERNAL_SESSION_SECRET_KEY

const jwtCallback: CallbacksOptions["jwt"] = async ({ token, account }) => {
    //Gerando um accessToken próprio duranto o login do usuário
    if (account) {
        const clientAccessToken = await dbExternalSigninUseCase.execute({
            name: token.name as string,
            email: token.email as string,
            image: token.picture || null
        })
        const { sub, picture, ...tokenRest } = token
        return { ...tokenRest, accessToken: clientAccessToken }
    }

    //Retornando o mesmos dados do token anterior, o qual contém o mesmo accessToken gerado
    //anteriormente
    return token
}

const sessionCallback: CallbacksOptions["session"] = async ({ session, token }) => {
    //Retornando apenas o acessToken para persistir no localStorage do usuário
    //e o expires, pois é obrigatório
    return {
        expires: session.expires,
        accessToken: token.accessToken
    }
}

export const nextAuthHandlerOptions: AuthOptions = {
    providers: [
        GoogleProvivder({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret: nextAuthSecretKey,
    // pages: {
    //     signIn: "/signin"
    // },
    session: {
        strategy: "jwt",
        maxAge: 60
    },
    callbacks: {
        jwt: jwtCallback,
        session: sessionCallback
    }
}
