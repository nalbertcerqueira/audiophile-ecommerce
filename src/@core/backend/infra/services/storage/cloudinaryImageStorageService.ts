import { ImageStorageService } from "@/@core/backend/domain/services/imageStorageService"
import { uploadStreamToCloudinary } from "./config/cloudinary-config"
import { allowedImgTypes } from "@/@core/shared/entities/constants"
import { UploadApiOptions } from "cloudinary"

export class CloudinaryImageStorageService implements ImageStorageService {
    private defaultOptions: UploadApiOptions = {
        folder: process.env.CLOUDINARY_PROJECT_FOLDER_NAME,
        overwrite: true,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || undefined,
        allowed_formats: allowedImgTypes.map((mime) => mime.split("/")[1]),
        resource_type: "image",
        transformation: { format: "webp", fetch_format: "webp" }
    }

    constructor(options?: UploadApiOptions) {
        Object.assign(this.defaultOptions, options)
    }

    public async store(id: string, image: File): Promise<string> {
        const arrayBuffer = await image.arrayBuffer()
        const fileBuffer = Buffer.from(arrayBuffer)

        const response = await uploadStreamToCloudinary(fileBuffer, {
            ...this.defaultOptions,
            public_id: id
        })

        if (!response) {
            throw new Error("Error during image upload to cloudinary")
        }

        return response.secure_url
    }
}
