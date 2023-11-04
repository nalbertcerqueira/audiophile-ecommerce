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

export class User {
    constructor(private props: UserProps) {}

    public toJSON(): UserProps {
        return this.props
    }
}
