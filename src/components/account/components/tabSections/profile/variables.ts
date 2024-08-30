export const allowedImgTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"]
export const allowedImgMessage = `accepts only ${allowedImgTypes.map((type) => type.split("/")[1]).join(", ")} formats`

export const maxUploadSize = 1000000
export const maxUploadSizeMessage = `size must be lesser than ${maxUploadSize / maxUploadSize}MB`
