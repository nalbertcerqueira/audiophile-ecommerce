import Image from "next/image"
import BeastGearImage from "/public/imgs/home/best-gear.jpg"

export function AboutSection({ className }: { className?: string }) {
    return (
        <section className="about-us">
            <div className={`about-us__inner-container ${className}`.trim()}>
                <div className="about-us__content">
                    <h2 className="about-us__title">
                        BRINGING YOU THE <br />{" "}
                        <span className="about-us__highlight">BEST</span> AUDIO GEAR
                    </h2>
                    <p className="about-us__text">
                        Located at the heart of New York City, Audiophile is the premier store
                        for high end headphones, earphones, speakers, and audio accessories. We
                        have a large showroom and luxury demonstration rooms available for you
                        to browse and experience a wide range of our products. Stop by our
                        store to meet some of the fantastic people who make Audiophile the best
                        place to buy your portable audio equipment.
                    </p>
                </div>
                <div className="about-us__img-container">
                    <Image
                        className="about-us__img"
                        src={BeastGearImage}
                        alt="a man using a headset while looks at something"
                    />
                </div>
            </div>
        </section>
    )
}
