import xx59DesktopProduct from "/public/imgs/product/xx59-headphones/desktop/xx59-product.jpg"
import xx59TabletProduct from "/public/imgs/product/xx59-headphones/tablet/xx59-product.jpg"
import xx59TabletPreview from "/public/imgs/product/xx59-headphones/tablet/xx59-preview.jpg"
import xx59MobileProduct from "/public/imgs/product/xx59-headphones/mobile/xx59-product.jpg"
import xx59MobilePreview from "/public/imgs/product/xx59-headphones/mobile/xx59-preview.jpg"

import xx59CartThumb from "/public/imgs/cart/xx59-headphones.jpg"

import xx59DesktopThumb from "/public/imgs/product/xx59-headphones/desktop/xx59-thumb.jpg"
import xx59TabletThumb from "/public/imgs/product/xx59-headphones/tablet/xx59-thumb.jpg"
import xx59MobileThumb from "/public/imgs/product/xx59-headphones/mobile/xx59-thumb.jpg"

import xx59FirstGalleryDesktopImg from "/public/imgs/product/xx59-headphones/desktop/gallery/image-gallery-1.jpg"
import xx59SecondGalleryDesktopImg from "/public/imgs/product/xx59-headphones/desktop/gallery/image-gallery-2.jpg"
import xx59ThirdGalleryDesktopImg from "/public/imgs/product/xx59-headphones/desktop/gallery/image-gallery-3.jpg"

import xx59FirstGalleryTabletImg from "/public/imgs/product/xx59-headphones/tablet/gallery/image-gallery-1.jpg"
import xx59SecondGalleryTabletImg from "/public/imgs/product/xx59-headphones/tablet/gallery/image-gallery-2.jpg"
import xx59ThirdGalleryTabletImg from "/public/imgs/product/xx59-headphones/tablet/gallery/image-gallery-3.jpg"

import xx59FirstGalleryMobileImg from "/public/imgs/product/xx59-headphones/mobile/gallery/image-gallery-1.jpg"
import xx59SecondGalleryMobileImg from "/public/imgs/product/xx59-headphones/mobile/gallery/image-gallery-2.jpg"
import xx59ThirdGalleryMobileImg from "/public/imgs/product/xx59-headphones/mobile/gallery/image-gallery-3.jpg"

import { StaticImageMap } from "../types"

export const xx59Headphones: StaticImageMap = {
    "xx59-headphones": {
        product: {
            desktop: xx59DesktopProduct,
            tablet: xx59TabletProduct,
            mobile: xx59MobileProduct
        },
        preview: {
            desktop: xx59DesktopProduct,
            tablet: xx59TabletPreview,
            mobile: xx59MobilePreview
        },
        thumb: {
            desktop: xx59DesktopThumb,
            tablet: xx59TabletThumb,
            mobile: xx59MobileThumb
        },
        cartThumb: xx59CartThumb,
        gallery: {
            first: {
                desktop: xx59FirstGalleryDesktopImg,
                tablet: xx59FirstGalleryTabletImg,
                mobile: xx59FirstGalleryMobileImg
            },
            second: {
                desktop: xx59SecondGalleryDesktopImg,
                tablet: xx59SecondGalleryTabletImg,
                mobile: xx59SecondGalleryMobileImg
            },
            third: {
                desktop: xx59ThirdGalleryDesktopImg,
                tablet: xx59ThirdGalleryTabletImg,
                mobile: xx59ThirdGalleryMobileImg
            }
        }
    }
}
