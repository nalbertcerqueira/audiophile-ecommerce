import { FooterNavLinks } from "./FooterNavLinks"
import { HomepageLink } from "@/components/shared/HomepageLink"
import { InstagramIcon } from "@/components/shared/icons/InstagramIcon"
import { FacebookIcon } from "@/components/shared/icons/FacebookIcon"
import { TwitterIcon } from "@/components/shared/icons/TwitterIcon"

export function Footer() {
    const externalLinks = [
        { ariaLabel: "go to audiophile page on facebook", icon: FacebookIcon },
        { ariaLabel: "go to audiophile page on instagram", icon: InstagramIcon },
        { ariaLabel: "go to audiophile page on twitter", icon: TwitterIcon }
    ]

    return (
        <footer className="footer">
            <div className="footer__inner-container">
                <div className="footer__inner-links">
                    <HomepageLink />
                    <FooterNavLinks />
                </div>
                <div className="footer__wrapper">
                    <p className="footer__about-brand">
                        Audiophile is an all in one stop to fulfill your audio needs.
                        We&apos;re a small team of music lovers and sound specialists who are
                        devoted to helping you get the most out of personal audio. Come and
                        visit our demo facility - we&apos;re open 7 days a week.
                    </p>
                    <div className="footer__external-links">
                        <div className="footer__social-media">
                            {externalLinks.map((link, i) => (
                                <a
                                    key={i}
                                    className="footer__social-link"
                                    aria-label={link.ariaLabel}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    href="/"
                                >
                                    <link.icon className="footer__social-icon" />
                                </a>
                            ))}
                        </div>
                        <p className="footer__attributions">
                            Code by{" "}
                            <a
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label="nalbert cerqueira. Access my github page"
                                aria-describedby="link-description"
                                className="footer__github"
                                href="https://github.com/nalbertcerqueira"
                            >
                                Nalbert Cerqueira
                            </a>
                        </p>
                    </div>
                    <p className="footer__copyright">Copyright 2024. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}
