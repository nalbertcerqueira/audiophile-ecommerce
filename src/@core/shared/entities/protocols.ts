export type EntityValidationResult<T> =
    | { success: true; data: T }
    | { success: false; errors: string[] }
