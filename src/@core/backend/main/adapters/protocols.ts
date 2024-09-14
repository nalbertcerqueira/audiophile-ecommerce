import { NextRequest, NextResponse } from "next/server"

export type NextFunction = (
    req: NextRequest,
    { params }: { params?: Record<string, string> }
) => Promise<NextResponse>
