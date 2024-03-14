export type EntityValidationResult<T> =
    | { success: true; data: T }
    | { success: false; errors: string[] }

export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
