import z from "zod"

//Gerando um schema do zod a partir de um tipo genérico <T>
export function schemaFromType<T>() {
    return <S extends z.ZodType<T, any, any>>(arg: S) => arg
}

//Gerando um array de erros a partir do error recebido pelo zod
export function generateCustomZodErrors<T extends z.ZodError<any>>(
    error: T,
    errorsPerField: number
): string[] {
    const errorCountMap: Record<string, number> = {}

    const errors = error.errors.map((error) => {
        const joinedPath = error.path.join("")
        const pathLength = error.path.length

        if (errorCountMap[joinedPath] >= errorsPerField) {
            return null
        }

        const formattedPath = error.path.reduce((acc, value, i) => {
            if (typeof value === "number") {
                acc += `[${value}].`
            } else if (pathLength > 1 && i === pathLength - 1 && typeof value === "string") {
                acc += `.${value}`.replace(/^\./, "")
            } else {
                acc += value[0].toUpperCase() + value.slice(1)
            }
            return acc
        }, "")

        if (typeof errorCountMap[joinedPath] === "number") errorCountMap[joinedPath] += 1
        else errorCountMap[joinedPath] = 1

        return `${formattedPath || ""} ${error.message.toLocaleLowerCase()}`.trim()
    })

    return errors.filter((error) => !!error) as string[]
}
