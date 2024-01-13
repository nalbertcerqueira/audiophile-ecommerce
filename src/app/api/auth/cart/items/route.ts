import { dbGuestAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/guestUser/dbGuestAuthorizationFactory"
import { dbAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/authenticatedUser/dbAuthorizationFactory"
import { NextRequest, NextResponse } from "next/server"
import { dbExternalAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/externalUser/dbExternalAuthorizationFactory"
import { UserType } from "@/@core/shared/entities/user/user"
import { addCartItemController } from "@/@core/backend/main/factories/controllers/cart/addCartItemControllerFactory"

export async function POST(req: NextRequest) {
    const sessionToken = req.headers.get("authorization")?.split(" ")[0] as string
    const body = await req.json()

    try {
        if (!sessionToken) {
            return NextResponse.json(
                {
                    errors: ["Unauthorized. You need valid credentials to access this content"]
                },
                {
                    status: 401,
                    headers: {
                        "WWW-Authenticate": 'Bearer realm="protected resource"'
                    }
                }
            )
        }

        const [authenticatedUser, guestUser, externalUser] = await Promise.allSettled([
            dbAuthorizationUseCase.execute(sessionToken),
            dbGuestAuthorizationUseCase.execute(sessionToken),
            dbExternalAuthorizationUseCase.execute(sessionToken)
        ])

        const selectedUser: { value: any; type: UserType | null } = {
            value: null,
            type: null
        }

        if (authenticatedUser.status === "fulfilled" && authenticatedUser.value) {
            selectedUser.value = authenticatedUser.value
            selectedUser.type = "authenticated"
        }
        if (externalUser.status === "fulfilled" && externalUser.value) {
            selectedUser.value = externalUser.value
            selectedUser.type = "external"
        }
        if (guestUser.status === "fulfilled" && guestUser.value) {
            selectedUser.value = guestUser.value
            selectedUser.type = "guest"
        }

        if (selectedUser.value && selectedUser.type) {
            const response = await addCartItemController.handle({
                body,
                user: { id: selectedUser.value.id, type: selectedUser.type }
            })
            const { statusCode, headers, ...responseRest } = response

            return NextResponse.json(
                { ...responseRest },
                { status: statusCode, headers: headers }
            )
        }

        return NextResponse.json({ errors: ["Unauthorized"] }, { status: 401 })
    } catch (error: any) {
        return NextResponse.json({ errors: [error.message] }, { status: 500 })
    }
}
