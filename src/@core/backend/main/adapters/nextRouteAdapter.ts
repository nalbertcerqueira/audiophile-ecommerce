import { NextRequest, NextResponse } from "next/server"
import { Controller } from "../../presentation/protocols/controller"

export function nextRouteAdapter(controller: Controller) {
    return async function (
        req: NextRequest,
        { params }: { params?: Record<string, string> }
    ): Promise<NextResponse> {
        const authorization = req.headers.get("authorization") as string
        let body = null

        try {
            body = await getRequestBody(req)
        } catch {
            body = {}
        }

        const { statusCode, headers, ...responseRest } = await controller.handle({
            user: req.user,
            headers: { authorization },
            params: params,
            body: body
        })

        return NextResponse.json(responseRest, { status: statusCode, headers })
    }
}
async function getRequestBody(req: NextRequest) {
    const contentType = req.headers.get("content-type")

    if (contentType?.includes("application/json")) {
        return await req.json()
    } else if (contentType?.includes("multipart/form-data")) {
        const formData = await req.formData()
        return Object.fromEntries(formData.entries())
    } else {
        throw new Error(`could not handle content-type: '${contentType}'`)
    }
}
