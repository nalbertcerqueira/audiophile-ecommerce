"use client"

import Image from "next/image"
import { staticProductImages } from "@/utils/imageMap"

export function GallerySection({ productSlug }: { productSlug: string }) {
    const images = staticProductImages[productSlug].gallery
    return (
        <section className="gallery">
            <div className="gallery__inner-container">
                <div className="gallery__small-item">
                    <Image className="gallery__image" src={images.first.desktop} alt="" />
                </div>
                <div className="gallery__small-item">
                    <Image className="gallery__image" src={images.second.desktop} alt="" />
                </div>
                <div className="gallery__large-item">
                    <Image className="gallery__image" src={images.third.desktop} alt="" />
                </div>
            </div>
        </section>
    )
}
