import { dbGuestAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/guestUser/dbGuestAuthorizationFactory"
import { dbRemoveCartItemUseCase } from "@/@core/backend/main/factories/usecases/cart/dbRemoveCartItemFactory"
import { generateCustomZodErrors } from "@/@core/shared/entities/helpers"
import { dbAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/authenticatedUser/dbAuthorizationFactory"
import { Cart } from "@/@core/shared/entities/cart/cart"
import { NextRequest, NextResponse } from "next/server"
import { dbExternalAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/externalUser/dbExternalAuthorizationFactory"
import { UserType } from "@/@core/shared/entities/user/user"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const sessionToken = req.headers.get("authorization")?.split(" ")[1]
    const body = await req.json()

    const validationResult = Cart.itemSchema.pick({ quantity: true }).safeParse(body)

    try {
        if (!validationResult.success) {
            const errors = generateCustomZodErrors(validationResult.error, 1)
            return NextResponse.json({ errors }, { status: 400 })
        }

        if (!sessionToken) {
            return NextResponse.json({ errors: ["Unauthorized"] }, { status: 401 })
        }

        const productId = params.id
        const quantity = body.quantity as number

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
            const cart = await dbRemoveCartItemUseCase.execute(
                { id: selectedUser.value.id, type: selectedUser.type },
                { productId, quantity }
            )

            if (cart) {
                return NextResponse.json({ data: cart.toJSON() }, { status: 200 })
            }

            return NextResponse.json(
                { errors: [`Product with id '${productId}' not found`] },
                { status: 404 }
            )
        }

        return NextResponse.json({ errors: ["Unauthorized"] }, { status: 401 })
    } catch (error: any) {
        return NextResponse.json({ errors: [error.message] }, { status: 500 })
    }
}
