export interface HashService {
    hash(input: string): Promise<string>
}
