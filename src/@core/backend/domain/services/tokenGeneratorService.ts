export interface TokenGeneratorService {
    generate(payload: any): Promise<string>
}
