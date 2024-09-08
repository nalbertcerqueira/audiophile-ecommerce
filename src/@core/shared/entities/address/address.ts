import { Entity } from "../helpers"
import { addressZodSchema } from "./utils"

export interface AddressProps {
    address: string
    city: string
    country: string
    zipCode: string
}

export class Address extends Entity<AddressProps> {
    private props: AddressProps
    private addressSchema = addressZodSchema

    constructor(props: AddressProps) {
        super()
        const validation = this.validate(props, this.addressSchema)

        if (!validation.success) {
            const firstError = validation.errors[0]
            throw new Error(firstError)
        }

        const { data } = validation
        this.props = { ...data }
    }

    public toJSON() {
        return {
            ...this.props
        }
    }
}
