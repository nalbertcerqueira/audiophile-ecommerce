import xx99MarkOneDesktopProduct from "/public/imgs/product/xx99-mark-one-headphones/desktop/xx99-mark-one-product.jpg"
import xx99MarkOneTabletProduct from "/public/imgs/product/xx99-mark-one-headphones/tablet/xx99-mark-one-product.jpg"
import xx99MarkOneTabletPreview from "/public/imgs/product/xx99-mark-one-headphones/tablet/xx99-mark-one-preview.jpg"
import xx99MarkOneMobileProduct from "/public/imgs/product/xx99-mark-one-headphones/mobile/xx99-mark-one-product.jpg"
import xx99MarkOneMobilePreview from "/public/imgs/product/xx99-mark-one-headphones/mobile/xx99-mark-one-preview.jpg"

import xx99MarkOneCartThumb from "/public/imgs/cart/xx99-mark-one-headphones.jpg"

import xx99MarkOneDesktopThumb from "/public/imgs/product/xx99-mark-one-headphones/desktop/xx99-mark-one-thumb.jpg"
import xx99MarkOneTabletThumb from "/public/imgs/product/xx99-mark-one-headphones/tablet/xx99-mark-one-thumb.jpg"
import xx99MarkOneMobileThumb from "/public/imgs/product/xx99-mark-one-headphones/mobile/xx99-mark-one-thumb.jpg"

import xx99MarkOneFirstGalleryDesktopImg from "/public/imgs/product/xx99-mark-one-headphones/desktop/gallery/image-gallery-1.jpg"
import xx99MarkOneSecondGalleryDesktopImg from "/public/imgs/product/xx99-mark-one-headphones/desktop/gallery/image-gallery-2.jpg"
import xx99MarkOneThirdGalleryDesktopImg from "/public/imgs/product/xx99-mark-one-headphones/desktop/gallery/image-gallery-3.jpg"

import xx99MarkOneFirstGalleryTabletImg from "/public/imgs/product/xx99-mark-one-headphones/tablet/gallery/image-gallery-1.jpg"
import xx99MarkOneSecondGalleryTabletImg from "/public/imgs/product/xx99-mark-one-headphones/tablet/gallery/image-gallery-2.jpg"
import xx99MarkOneThirdGalleryTabletImg from "/public/imgs/product/xx99-mark-one-headphones/tablet/gallery/image-gallery-3.jpg"

import xx99MarkOneFirstGalleryMobileImg from "/public/imgs/product/xx99-mark-one-headphones/mobile/gallery/image-gallery-1.jpg"
import xx99MarkOneSecondGalleryMobileImg from "/public/imgs/product/xx99-mark-one-headphones/mobile/gallery/image-gallery-2.jpg"
import xx99MarkOneThirdGalleryMobileImg from "/public/imgs/product/xx99-mark-one-headphones/mobile/gallery/image-gallery-3.jpg"

import { StaticImageMap } from "../types"

export const xx99MarkOneHeadphones: StaticImageMap = {
    "xx99-mark-one-headphones": {
        product: {
            desktop: xx99MarkOneDesktopProduct,
            tablet: xx99MarkOneTabletProduct,
            mobile: xx99MarkOneMobileProduct
        },
        preview: {
            desktop: xx99MarkOneDesktopProduct,
            tablet: xx99MarkOneTabletPreview,
            mobile: xx99MarkOneMobilePreview
        },
        thumb: {
            desktop: xx99MarkOneDesktopThumb,
            tablet: xx99MarkOneTabletThumb,
            mobile: xx99MarkOneMobileThumb
        },
        cartThumb: xx99MarkOneCartThumb,
        gallery: {
            first: {
                desktop: xx99MarkOneFirstGalleryDesktopImg,
                tablet: xx99MarkOneFirstGalleryTabletImg,
                mobile: xx99MarkOneFirstGalleryMobileImg
            },
            second: {
                desktop: xx99MarkOneSecondGalleryDesktopImg,
                tablet: xx99MarkOneSecondGalleryTabletImg,
                mobile: xx99MarkOneSecondGalleryMobileImg
            },
            third: {
                desktop: xx99MarkOneThirdGalleryDesktopImg,
                tablet: xx99MarkOneThirdGalleryTabletImg,
                mobile: xx99MarkOneThirdGalleryMobileImg
            }
        }
    }
}
