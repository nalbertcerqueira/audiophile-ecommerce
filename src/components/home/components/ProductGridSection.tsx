import LargeSpeaker from "/public/imgs/home/large-speaker.png"
import LargeSpeakerTablet from "/public/imgs/home/large-speaker-tablet.png"
import LargeSpeakerMobile from "/public/imgs/home/large-speaker-mobile.png"
import SpeakerBanner from "/public/imgs/home/speaker-banner.jpg"
import SpeakerBannerTablet from "/public/imgs/home/speaker-banner-tablet.jpg"
import SpeakerBannerMobile from "/public/imgs/home/speaker-banner-mobile.jpg"
import EarphoneBanner from "/public/imgs/home/earphone-banner.jpg"
import EarphoneBannerTablet from "/public/imgs/home/earphone-banner-tablet.jpg"
import EarphoneBannerMobile from "/public/imgs/home/earphone-banner-mobile.jpg"

import Link from "next/link"
import { CirclePattern } from "@/components/home/components/CirclePattern"
import { ResponsiveImages } from "@/components/shared/ResponsiveImages"

export function ProductGridSection() {
    return (
        <section aria-label="Some of Audiophile best products" className="product-grid">
            <div className="product-grid__inner-container">
                <div className="product-grid__large-item">
                    <div className="featured-product">
                        <div className="featured-product__img-box">
                            <CirclePattern className="featured-product__circle-patterns" />
                            <ResponsiveImages
                                images={[
                                    {
                                        ...LargeSpeaker,
                                        alt: "an image of ZX9 speaker",
                                        className:
                                            "featured-product__img featured-product__img--desktop"
                                    },
                                    {
                                        ...LargeSpeakerTablet,
                                        alt: "an image of ZX9 speaker",
                                        className:
                                            "featured-product__img featured-product__img--tablet"
                                    },
                                    {
                                        ...LargeSpeakerMobile,
                                        alt: "an image of ZX9 speaker",
                                        className:
                                            "featured-product__img featured-product__img--mobile"
                                    }
                                ]}
                            />
                        </div>
                        <div className="featured-product__info">
                            <h2 className="featured-product__name">
                                ZX9 <br />
                                SPEAKER
                            </h2>
                            <p className="featured-product__about">
                                Upgrade to premium speakers that are <br />
                                phenomenally built to deliver truly remarkable <br />
                                sound.
                            </p>
                            <Link
                                className="btn btn--normal featured-product__link"
                                href="/speakers/zx9-speaker"
                            >
                                SEE PRODUCT
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="product-grid__medium-item">
                    <div className="medium-banner">
                        <ResponsiveImages
                            images={[
                                {
                                    ...SpeakerBanner,
                                    alt: "",
                                    className: "medium-banner__img medium-banner__img--desktop"
                                },
                                {
                                    ...SpeakerBannerTablet,
                                    alt: "",
                                    className: "medium-banner__img medium-banner__img--tablet"
                                },
                                {
                                    ...SpeakerBannerMobile,
                                    alt: "",
                                    className: "medium-banner__img medium-banner__img--mobile"
                                }
                            ]}
                        />
                        <div className="info-wrapper">
                            <h2 className="info-wrapper__name">ZX7 SPEAKER</h2>
                            <Link className="btn btn--empty" href="/speakers/zx7-speaker">
                                SEE PRODUCT
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="product-grid__small-item">
                    <div className="small-banner">
                        <ResponsiveImages
                            images={[
                                {
                                    ...EarphoneBanner,
                                    alt: "",
                                    className: "small-banner__img small-banner__img--desktop"
                                },
                                {
                                    ...EarphoneBannerTablet,
                                    alt: "",
                                    className: "small-banner__img small-banner__img--tablet"
                                },
                                {
                                    ...EarphoneBannerMobile,
                                    alt: "",
                                    className: "small-banner__img small-banner__img--mobile"
                                }
                            ]}
                        />
                    </div>
                </div>
                <div className="product-grid__small-item">
                    <div className="small-info">
                        <div className="info-wrapper">
                            <h2 className="info-wrapper__name">YX1 EARPHONES</h2>
                            <Link className="btn btn--empty" href="/earphones/yx1-earphones">
                                SEE PRODUCT
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
