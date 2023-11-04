import z from "zod"

export interface UserProps {
    readonly id: string
    name: string
    email: string
    password: string
    images: {
        profile: string | null
        profileThumb: string | null
    }
}

const passwordRegexp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%+<>,.?-]).+$/g
const nameRegexp = /^[A-Za-z]*[0-9]?[A-Za-z]*[0-9]?[A-Za-z]*$/g

const userZodSchema: z.ZodSchema<UserProps> = z.object({
    id: z.string().min(24),
    email: z.string().email(),
    password: z
        .string()
        .min(8)
        .refine((password) => password.match(passwordRegexp)),
    name: z
        .string()
        .min(5)
        .refine((name) => name.match(nameRegexp)),
    images: z.object({
        profile: z.string().url().nullable(),
        profileThumb: z.string().url().nullable()
    })
})

export class User {
    private readonly userSchema: z.ZodSchema<UserProps> = userZodSchema
    constructor(private props: UserProps) {}

    public toJSON(): UserProps {
        return this.props
    }

    public validateUser(data: any): boolean {
        const validationResult = this.userSchema.safeParse(data)
        return validationResult.success
    }
}
