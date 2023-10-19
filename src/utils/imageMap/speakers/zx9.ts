import zx9DesktopProduct from "/public/imgs/product/zx9-speaker/desktop/zx9-product.jpg"
import zx9TabletProduct from "/public/imgs/product/zx9-speaker/tablet/zx9-product.jpg"
import zx9TabletPreview from "/public/imgs/product/zx9-speaker/tablet/zx9-preview.jpg"
import zx9MobileProduct from "/public/imgs/product/zx9-speaker/mobile/zx9-product.jpg"
import zx9MobilePreview from "/public/imgs/product/zx9-speaker/mobile/zx9-preview.jpg"

import zx9CartThumb from "/public/imgs/product/zx9-speaker/mobile/zx9-preview.jpg"

import zx9DesktopThumb from "/public/imgs/product/zx9-speaker/desktop/zx9-thumb.jpg"
import zx9TabletThumb from "/public/imgs/product/zx9-speaker/tablet/zx9-thumb.jpg"
import zx9MobileThumb from "/public/imgs/product/zx9-speaker/mobile/zx9-thumb.jpg"

import zx9FirstGalleryDesktopImg from "/public/imgs/product/zx9-speaker/desktop/gallery/image-gallery-1.jpg"
import zx9SecondGalleryDesktopImg from "/public/imgs/product/zx9-speaker/desktop/gallery/image-gallery-2.jpg"
import zx9ThirdGalleryDesktopImg from "/public/imgs/product/zx9-speaker/desktop/gallery/image-gallery-3.jpg"

import zx9FirstGalleryTabletImg from "/public/imgs/product/zx9-speaker/tablet/gallery/image-gallery-1.jpg"
import zx9SecondGalleryTabletImg from "/public/imgs/product/zx9-speaker/tablet/gallery/image-gallery-2.jpg"
import zx9ThirdGalleryTabletImg from "/public/imgs/product/zx9-speaker/tablet/gallery/image-gallery-3.jpg"

import zx9FirstGalleryMobileImg from "/public/imgs/product/zx9-speaker/mobile/gallery/image-gallery-1.jpg"
import zx9SecondGalleryMobileImg from "/public/imgs/product/zx9-speaker/mobile/gallery/image-gallery-2.jpg"
import zx9ThirdGalleryMobileImg from "/public/imgs/product/zx9-speaker/mobile/gallery/image-gallery-3.jpg"

import { StaticImageMap } from "../types"

export const zx9Headphones: StaticImageMap = {
    "zx9-speaker": {
        product: {
            desktop: zx9DesktopProduct,
            tablet: zx9TabletProduct,
            mobile: zx9MobileProduct
        },
        preview: {
            desktop: zx9DesktopProduct,
            tablet: zx9TabletPreview,
            mobile: zx9MobilePreview
        },
        thumb: {
            desktop: zx9DesktopThumb,
            tablet: zx9TabletThumb,
            mobile: zx9MobileThumb
        },
        cartThumb: zx9CartThumb,
        gallery: {
            first: {
                desktop: zx9FirstGalleryDesktopImg,
                tablet: zx9FirstGalleryTabletImg,
                mobile: zx9FirstGalleryMobileImg
            },
            second: {
                desktop: zx9SecondGalleryDesktopImg,
                tablet: zx9SecondGalleryTabletImg,
                mobile: zx9SecondGalleryMobileImg
            },
            third: {
                desktop: zx9ThirdGalleryDesktopImg,
                tablet: zx9ThirdGalleryTabletImg,
                mobile: zx9ThirdGalleryMobileImg
            }
        }
    }
}
