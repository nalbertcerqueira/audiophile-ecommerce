import z from "zod"

export function zodErrorFormater<T extends z.ZodError<any>>(error: T): string[] {
    return error.errors.map((error) => {
        const pathLength = error.path.length

        const formatedPath = error.path.reduce((acc, value, i) => {
            if (typeof value === "number") {
                acc += `[${value}]`
            } else if (pathLength > 1 && i === pathLength - 1 && typeof value === "string") {
                acc += `.${value}`.replace(/^\./, "")
            } else {
                acc += value[0].toUpperCase() + value.slice(1)
            }
            return acc
        }, "")

        return `${formatedPath || ""} ${error.message.toLocaleLowerCase()}`.trim()
    })
}
