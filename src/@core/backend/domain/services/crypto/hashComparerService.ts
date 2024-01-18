export interface HashComparerService {
    compare(input: string, hash: string): Promise<boolean>
}
