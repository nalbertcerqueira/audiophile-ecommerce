import z from "zod"

export function schemaFromType<T>() {
    return <S extends z.ZodType<T, any, any>>(arg: S) => arg
}
