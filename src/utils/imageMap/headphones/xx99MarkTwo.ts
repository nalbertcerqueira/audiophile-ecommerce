import xx99MarkTwoDesktopProduct from "/public/imgs/product/xx99-mark-two-headphones/desktop/xx99-mark-two-product.jpg"
import xx99MarkTwoTabletProduct from "/public/imgs/product/xx99-mark-two-headphones/tablet/xx99-mark-two-product.jpg"
import xx99MarkTwoTabletPreview from "/public/imgs/product/xx99-mark-two-headphones/tablet/xx99-mark-two-preview.jpg"
import xx99MarkTwoMobileProduct from "/public/imgs/product/xx99-mark-two-headphones/mobile/xx99-mark-two-product.jpg"
import xx99MarkTwoMobilePreview from "/public/imgs/product/xx99-mark-two-headphones/mobile/xx99-mark-two-preview.jpg"

import xx99MarkTwoCartThumb from "/public/imgs/cart/xx99-mark-two-headphones.jpg"

import xx99MarkTwoDesktopThumb from "/public/imgs/product/xx99-mark-two-headphones/desktop/xx99-mark-two-thumb.jpg"
import xx99MarkTwoTabletThumb from "/public/imgs/product/xx99-mark-two-headphones/tablet/xx99-mark-two-thumb.jpg"
import xx99MarkTwoMobileThumb from "/public/imgs/product/xx99-mark-two-headphones/mobile/xx99-mark-two-thumb.jpg"

import xx99MarkTwoFirstGalleryDesktopImg from "/public/imgs/product/xx99-mark-two-headphones/desktop/gallery/image-gallery-1.jpg"
import xx99MarkTwoSecondGalleryDesktopImg from "/public/imgs/product/xx99-mark-two-headphones/desktop/gallery/image-gallery-2.jpg"
import xx99MarkTwoThirdGalleryDesktopImg from "/public/imgs/product/xx99-mark-two-headphones/desktop/gallery/image-gallery-3.jpg"

import xx99MarkTwoFirstGalleryTabletImg from "/public/imgs/product/xx99-mark-two-headphones/tablet/gallery/image-gallery-1.jpg"
import xx99MarkTwoSecondGalleryTabletImg from "/public/imgs/product/xx99-mark-two-headphones/tablet/gallery/image-gallery-2.jpg"
import xx99MarkTwoThirdGalleryTabletImg from "/public/imgs/product/xx99-mark-two-headphones/tablet/gallery/image-gallery-3.jpg"

import xx99MarkTwoFirstGalleryMobileImg from "/public/imgs/product/xx99-mark-two-headphones/mobile/gallery/image-gallery-1.jpg"
import xx99MarkTwoSecondGalleryMobileImg from "/public/imgs/product/xx99-mark-two-headphones/mobile/gallery/image-gallery-2.jpg"
import xx99MarkTwoThirdGalleryMobileImg from "/public/imgs/product/xx99-mark-two-headphones/mobile/gallery/image-gallery-3.jpg"

import { StaticImageMap } from "../types"

export const xx99MarkTwoHeadphones: StaticImageMap = {
    "xx99-mark-two-headphones": {
        product: {
            desktop: xx99MarkTwoDesktopProduct,
            tablet: xx99MarkTwoTabletProduct,
            mobile: xx99MarkTwoMobileProduct
        },
        preview: {
            desktop: xx99MarkTwoDesktopProduct,
            tablet: xx99MarkTwoTabletPreview,
            mobile: xx99MarkTwoMobilePreview
        },
        thumb: {
            desktop: xx99MarkTwoDesktopThumb,
            tablet: xx99MarkTwoTabletThumb,
            mobile: xx99MarkTwoMobileThumb
        },
        cartThumb: xx99MarkTwoCartThumb,
        gallery: {
            first: {
                desktop: xx99MarkTwoFirstGalleryDesktopImg,
                tablet: xx99MarkTwoFirstGalleryTabletImg,
                mobile: xx99MarkTwoFirstGalleryMobileImg
            },
            second: {
                desktop: xx99MarkTwoSecondGalleryDesktopImg,
                tablet: xx99MarkTwoSecondGalleryTabletImg,
                mobile: xx99MarkTwoSecondGalleryMobileImg
            },
            third: {
                desktop: xx99MarkTwoThirdGalleryDesktopImg,
                tablet: xx99MarkTwoThirdGalleryTabletImg,
                mobile: xx99MarkTwoThirdGalleryMobileImg
            }
        }
    }
}
