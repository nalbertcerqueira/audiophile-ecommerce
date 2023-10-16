import Image from "next/image"
import GalleryImage1 from "/public/imgs/product/xx99-mark-two-headphones/desktop/gallery/image-gallery-1.jpg"
import GalleryImage2 from "/public/imgs/product/xx99-mark-two-headphones/desktop/gallery/image-gallery-2.jpg"
import GalleryImage3 from "/public/imgs/product/xx99-mark-two-headphones/desktop/gallery/image-gallery-3.jpg"

export function GallerySection() {
    return (
        <section className="gallery">
            <div className="gallery__inner-container">
                <div className="gallery__small-item">
                    <Image className="gallery__image" src={GalleryImage1} alt="" />
                </div>
                <div className="gallery__small-item">
                    <Image className="gallery__image" src={GalleryImage2} alt="" />
                </div>
                <div className="gallery__large-item">
                    <Image className="gallery__image" src={GalleryImage3} alt="" />
                </div>
            </div>
        </section>
    )
}
