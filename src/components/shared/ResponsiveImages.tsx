import Image from "next/image"

interface ImageInfo {
    src: string
    width: number
    height: number
    className: string
    alt: string
    blurDataURL?: string
    blurWidth?: number
    blurHeight?: number
}

interface ReponsiveImagesProps {
    images: ImageInfo[]
}

export function ResponsiveImages({ images }: ReponsiveImagesProps) {
    return (
        <>
            {images.map((image, i) => (
                <Image {...image} alt={image.alt} key={i} />
            ))}
        </>
    )
}
