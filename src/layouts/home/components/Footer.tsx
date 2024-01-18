import { AudiophileLogo } from "@/components/shared/Logo"
import { NavLink } from "@/components/shared/NavLink"
import { FacebookIcon } from "@/components/shared/icons/FacebookIcon"
import { InstagramIcon } from "@/components/shared/icons/InstagramIcon"
import { TwitterIcon } from "@/components/shared/icons/TwitterIcon"

export function Footer() {
    const pathnames: string[] = ["/home", "/headphones", "/speakers", "/earphones"]
    const externalLinks = [
        { ariaLabel: "go to audiophile oficial page on facebook", icon: FacebookIcon },
        { ariaLabel: "go to audiophile oficial page on instagram", icon: InstagramIcon },
        { ariaLabel: "go to audiophile oficial page on twitter", icon: TwitterIcon }
    ]

    return (
        <footer className="footer">
            <div className="footer__inner-container">
                <div className="footer__inner-links">
                    <AudiophileLogo />
                    <ul className="footer__nav-links">
                        {pathnames.map((path) => (
                            <li key={path}>
                                <NavLink path={`${path === "/home" ? "/" : path}`}>
                                    {path.slice(1).toUpperCase()}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
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
                                aria-label="nalbert cerqueira's github"
                                className="footer__github"
                                href="https://github.com/nalbertcerqueira"
                            >
                                Nalbert Cerqueira
                            </a>
                        </p>
                    </div>
                    <p className="footer__copyright">Copyright 2021. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}
