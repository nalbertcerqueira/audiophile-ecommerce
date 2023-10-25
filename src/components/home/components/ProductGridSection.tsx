import Image from "next/image"
import LargeSpeaker from "/public/imgs/home/large-speaker.png"
import Link from "next/link"
import { CirclePatterns } from "@/components/shared/CirclePattern"

export function ProductGridSection() {
    return (
        <section className="product-grid">
            <div className="product-grid__inner-container">
                <div className="product-grid__large-item">
                    <div className="featured-product">
                        <div className="featured-product__img-box">
                            <CirclePatterns className="featured-product__circle-patterns" />
                            <Image
                                className="featured-product__img"
                                src={LargeSpeaker}
                                alt="ZX9 speaker"
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
                                role="button"
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
                        <div className="info-wrapper">
                            <h3 className="info-wrapper__name">ZX7 SPEAKER</h3>
                            <Link
                                className="btn btn--empty"
                                role="button"
                                href="/speakers/zx7-speaker"
                            >
                                SEE PRODUCT
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="product-grid__small-item">
                    <div className="small-banner" />
                </div>
                <div className="product-grid__small-item">
                    <div className="small-info">
                        <div className="info-wrapper">
                            <h3 className="info-wrapper__name">YX1 EARPHONES</h3>
                            <Link
                                className="btn btn--empty"
                                role="button"
                                href="/earphones/yx1-earphones"
                            >
                                SEE PRODUCT
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
