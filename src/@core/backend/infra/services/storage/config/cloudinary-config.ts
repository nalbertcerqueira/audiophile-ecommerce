import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from "cloudinary"

export const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export function uploadStreamToCloudinary(
    buffer: Buffer,
    options: UploadApiOptions
): Promise<UploadApiResponse | undefined> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(options, (error, response) => {
                if (error) {
                    reject(error)
                }
                resolve(response)
            })
            .end(buffer)
    })
}
