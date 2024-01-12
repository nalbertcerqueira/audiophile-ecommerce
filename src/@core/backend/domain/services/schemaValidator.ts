interface SuccessfulValidation {
    isValid: true
    data: any
}

interface FailedValidation {
    isValid: false
    errors: string[]
}

export type ValidationResult = SuccessfulValidation | FailedValidation

export interface SchemaValidatorService {
    validate(data: any): Promise<ValidationResult>
}
