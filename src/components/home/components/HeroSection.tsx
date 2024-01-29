"use client"

import Link from "next/link"
import HeroImage from "/public/imgs/home/image-hero.jpg"
import HeroImageTablet from "/public/imgs/home/image-hero-tablet.jpg"
import { ResponsiveImages } from "@/components/shared/ResponsiveImages"

export function HeroSection() {
    return (
        <>
            <section className="hero">
                <div className="hero__inner-container">
                    <span className="hero__separator" />
                    <div className="hero__content-wrapper">
                        <div className="hero__featured-info">
                            <span className="hero__overline">NEW PRODUCT</span>
                            <h1 className="hero__title">XX99 MARK II HEADPHONES</h1>
                            <p className="hero__product-info">
                                Experience natural, lifelike audio and exceptional build
                                quality made for the passionate music enthusiast.
                            </p>
                        </div>
                        <Link
                            className="btn btn--primary hero__btn"
                            role="button"
                            href="/headphones/xx99-mark-two-headphones"
                        >
                            SEE PRODUCT
                        </Link>
                    </div>
                </div>
            </section>
            <ResponsiveImages
                images={[
                    {
                        ...HeroImage,
                        alt: "XX99 Mark II black headset",
                        className: "hero-banner hero-banner--desktop"
                    },
                    {
                        ...HeroImageTablet,
                        alt: "XX99 Mark II black headset",
                        className: "hero-banner hero-banner--tablet"
                    }
                ]}
            />
        </>
    )
}
