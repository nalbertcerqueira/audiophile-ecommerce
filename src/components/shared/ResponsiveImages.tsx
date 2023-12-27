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
    images: (ImageInfo | undefined)[]
}

export function ResponsiveImages({ images }: ReponsiveImagesProps) {
    return (
        <>
            {images.map((image, i) => {
                if (image) {
                    return (
                        <Image
                            placeholder="blur"
                            src={{
                                src: image.src,
                                width: image.width,
                                height: image.height,
                                blurDataURL: image.blurDataURL,
                                blurHeight: image.blurHeight,
                                blurWidth: image.blurWidth
                            }}
                            alt={image.alt}
                            className={image.className}
                            key={i}
                        />
                    )
                }
            })}
        </>
    )
}
