export interface TokenGeneratorService {
    generate(payload: any, secretKey: string): Promise<string>
}
