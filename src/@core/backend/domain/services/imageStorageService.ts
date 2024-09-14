export interface ImageStorageService {
    store(id: string, image: File): Promise<string>
}
