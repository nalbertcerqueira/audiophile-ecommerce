import Image from "next/image"
import { AriaAttributes } from "react"

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

interface ReponsiveImagesProps extends AriaAttributes {
    images: (ImageInfo | undefined)[]
}

export function ResponsiveImages({ images, ...ariaProps }: ReponsiveImagesProps) {
    return (
        <>
            {images.map((image, i) => {
                if (image) {
                    return (
                        <Image
                            {...ariaProps}
                            src={{
                                src: image.src,
                                width: image.width,
                                height: image.height,
                                blurDataURL: image.blurDataURL,
                                blurHeight: image.blurHeight,
                                blurWidth: image.blurWidth
                            }}
                            placeholder="blur"
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
