import { NextRequest, NextResponse } from "next/server"
import { Controller } from "../../presentation/protocols/controller"
import { NextFunction } from "./protocols"

export function nextMiddlewareAdapter(middleware: Controller, next: NextFunction) {
    return async function (req: NextRequest, { params }: { params?: Record<string, string> }) {
        const authorization = req.headers.get("authorization") as string
        const authResponse = await middleware.handle({
            headers: { authorization }
        })

        if (authResponse.statusCode !== 200) {
            const { statusCode, headers, ...responseRest } = authResponse
            return NextResponse.json(responseRest, { status: statusCode, headers })
        }

        req.user = {
            id: authResponse.data.id,
            type: authResponse.data.type
        }

        return next(req, { params })
    }
}
export function guestNextMiddlewareAdapter(middleware: Controller, controller: Controller) {
    return async function (req: NextRequest, { params }: { params?: Record<string, string> }) {
        const authorization = req.headers.get("authorization") as string
        const authResponse = await middleware.handle({
            headers: { authorization }
        })

        if (authResponse.statusCode !== 200) {
            const { statusCode, headers, ...responseRest } = await controller.handle({
                params: params
            })
            return NextResponse.json(responseRest, { status: statusCode, headers })
        }

        return NextResponse.json({ data: authResponse.data }, { status: 200 })
    }
}
