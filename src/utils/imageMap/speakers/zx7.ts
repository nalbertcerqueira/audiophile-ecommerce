import zx7DesktopProduct from "/public/imgs/product/zx7-speaker/desktop/zx7-product.jpg"
import zx7TabletProduct from "/public/imgs/product/zx7-speaker/tablet/zx7-product.jpg"
import zx7TabletPreview from "/public/imgs/product/zx7-speaker/tablet/zx7-preview.jpg"
import zx7MobileProduct from "/public/imgs/product/zx7-speaker/mobile/zx7-product.jpg"
import zx7MobilePreview from "/public/imgs/product/zx7-speaker/mobile/zx7-preview.jpg"

import zx7CartThumb from "/public/imgs/cart/zx7-speaker.jpg"

import zx7DesktopThumb from "/public/imgs/product/zx7-speaker/desktop/zx7-thumb.jpg"
import zx7TabletThumb from "/public/imgs/product/zx7-speaker/tablet/zx7-thumb.jpg"
import zx7MobileThumb from "/public/imgs/product/zx7-speaker/mobile/zx7-thumb.jpg"

import zx7FirstGalleryDesktopImg from "/public/imgs/product/zx7-speaker/desktop/gallery/image-gallery-1.jpg"
import zx7SecondGalleryDesktopImg from "/public/imgs/product/zx7-speaker/desktop/gallery/image-gallery-2.jpg"
import zx7ThirdGalleryDesktopImg from "/public/imgs/product/zx7-speaker/desktop/gallery/image-gallery-3.jpg"

import zx7FirstGalleryTabletImg from "/public/imgs/product/zx7-speaker/tablet/gallery/image-gallery-1.jpg"
import zx7SecondGalleryTabletImg from "/public/imgs/product/zx7-speaker/tablet/gallery/image-gallery-2.jpg"
import zx7ThirdGalleryTabletImg from "/public/imgs/product/zx7-speaker/tablet/gallery/image-gallery-3.jpg"

import zx7FirstGalleryMobileImg from "/public/imgs/product/zx7-speaker/mobile/gallery/image-gallery-1.jpg"
import zx7SecondGalleryMobileImg from "/public/imgs/product/zx7-speaker/mobile/gallery/image-gallery-2.jpg"
import zx7ThirdGalleryMobileImg from "/public/imgs/product/zx7-speaker/mobile/gallery/image-gallery-3.jpg"

import { StaticImageMap } from "../types"

export const zx7Headphones: StaticImageMap = {
    "zx7-speaker": {
        product: {
            desktop: zx7DesktopProduct,
            tablet: zx7TabletProduct,
            mobile: zx7MobileProduct
        },
        preview: {
            desktop: zx7DesktopProduct,
            tablet: zx7TabletPreview,
            mobile: zx7MobilePreview
        },
        thumb: {
            desktop: zx7DesktopThumb,
            tablet: zx7TabletThumb,
            mobile: zx7MobileThumb
        },
        cartThumb: zx7CartThumb,
        gallery: {
            first: {
                desktop: zx7FirstGalleryDesktopImg,
                tablet: zx7FirstGalleryTabletImg,
                mobile: zx7FirstGalleryMobileImg
            },
            second: {
                desktop: zx7SecondGalleryDesktopImg,
                tablet: zx7SecondGalleryTabletImg,
                mobile: zx7SecondGalleryMobileImg
            },
            third: {
                desktop: zx7ThirdGalleryDesktopImg,
                tablet: zx7ThirdGalleryTabletImg,
                mobile: zx7ThirdGalleryMobileImg
            }
        }
    }
}
