import yx1DesktopProduct from "/public/imgs/product/yx1-earphones/desktop/yx1-product.jpg"
import yx1TabletProduct from "/public/imgs/product/yx1-earphones/tablet/yx1-product.jpg"
import yx1TabletPreview from "/public/imgs/product/yx1-earphones/tablet/yx1-preview.jpg"
import yx1MobileProduct from "/public/imgs/product/yx1-earphones/mobile/yx1-product.jpg"
import yx1MobilePreview from "/public/imgs/product/yx1-earphones/mobile/yx1-preview.jpg"

import yx1CartThumb from "/public/imgs/cart/yx1-earphones.jpg"

import yx1FirstGalleryDesktopImg from "/public/imgs/product/yx1-earphones/desktop/gallery/image-gallery-1.jpg"
import yx1SecondGalleryDesktopImg from "/public/imgs/product/yx1-earphones/desktop/gallery/image-gallery-2.jpg"
import yx1ThirdGalleryDesktopImg from "/public/imgs/product/yx1-earphones/desktop/gallery/image-gallery-3.jpg"

import yx1FirstGalleryTabletImg from "/public/imgs/product/yx1-earphones/tablet/gallery/image-gallery-1.jpg"
import yx1SecondGalleryTabletImg from "/public/imgs/product/yx1-earphones/tablet/gallery/image-gallery-2.jpg"
import yx1ThirdGalleryTabletImg from "/public/imgs/product/yx1-earphones/tablet/gallery/image-gallery-3.jpg"

import yx1FirstGalleryMobileImg from "/public/imgs/product/yx1-earphones/mobile/gallery/image-gallery-1.jpg"
import yx1SecondGalleryMobileImg from "/public/imgs/product/yx1-earphones/mobile/gallery/image-gallery-2.jpg"
import yx1ThirdGalleryMobileImg from "/public/imgs/product/yx1-earphones/mobile/gallery/image-gallery-3.jpg"

import { StaticImageMap } from "../types"

export const yx1Earphones: StaticImageMap = {
    "yx1-earphones": {
        product: {
            desktop: yx1DesktopProduct,
            tablet: yx1TabletProduct,
            mobile: yx1MobileProduct
        },
        preview: {
            desktop: yx1DesktopProduct,
            tablet: yx1TabletPreview,
            mobile: yx1MobilePreview
        },
        cartThumb: yx1CartThumb,
        gallery: {
            first: {
                desktop: yx1FirstGalleryDesktopImg,
                tablet: yx1FirstGalleryTabletImg,
                mobile: yx1FirstGalleryMobileImg
            },
            second: {
                desktop: yx1SecondGalleryDesktopImg,
                tablet: yx1SecondGalleryTabletImg,
                mobile: yx1SecondGalleryMobileImg
            },
            third: {
                desktop: yx1ThirdGalleryDesktopImg,
                tablet: yx1ThirdGalleryTabletImg,
                mobile: yx1ThirdGalleryMobileImg
            }
        }
    }
}
