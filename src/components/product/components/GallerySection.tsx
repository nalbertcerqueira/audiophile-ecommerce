import { staticProductImages } from "@/utils/imageMap"
import { ResponsiveImages } from "@/components/shared/ResponsiveImages"

export function GallerySection({ productSlug }: { productSlug: string }) {
    const images = staticProductImages[productSlug].gallery

    return (
        <section className="gallery">
            <div className="gallery__inner-container">
                <div className="gallery__small-item">
                    <ResponsiveImages
                        aria-hidden="true"
                        images={[
                            {
                                ...images.first.desktop,
                                className: "gallery__image gallery__image--desktop",
                                alt: ""
                            },
                            {
                                ...images.first.tablet,
                                className: "gallery__image gallery__image--tablet",
                                alt: ""
                            },
                            {
                                ...images.first.mobile,
                                className: "gallery__image gallery__image--mobile",
                                alt: ""
                            }
                        ]}
                    />
                </div>
                <div className="gallery__small-item">
                    <ResponsiveImages
                        images={[
                            {
                                ...images.second.desktop,
                                className: "gallery__image gallery__image--desktop",
                                alt: ""
                            },
                            {
                                ...images.second.tablet,
                                className: "gallery__image gallery__image--tablet",
                                alt: ""
                            },
                            {
                                ...images.second.mobile,
                                className: "gallery__image gallery__image--mobile",
                                alt: ""
                            }
                        ]}
                    />
                </div>
                <div className="gallery__large-item">
                    <ResponsiveImages
                        images={[
                            {
                                ...images.third.desktop,
                                className: "gallery__image gallery__image--desktop",
                                alt: ""
                            },
                            {
                                ...images.third.tablet,
                                className: "gallery__image gallery__image--tablet",
                                alt: ""
                            },
                            {
                                ...images.third.mobile,
                                className: "gallery__image gallery__image--mobile",
                                alt: ""
                            }
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}
