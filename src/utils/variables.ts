import HeadphoneThumb from "/public/imgs/headphones-thumbnail.png"
import SpeakerThumb from "/public/imgs/speakers-thumbnail.png"
import EarphoneThumb from "/public/imgs/earphones-thumbnail.png"

export const categories = [
    {
        name: "headphones",
        link: "/headphones",
        thumb: HeadphoneThumb,
        thumbAlt: "black headphones with golden details"
    },
    {
        name: "speakers",
        link: "/speakers",
        thumb: SpeakerThumb,
        thumbAlt: "a small black horn loudspeaker with high impact"
    },
    {
        name: "earphones",
        link: "/earphones",
        thumb: EarphoneThumb,
        thumbAlt: "rounded earphone"
    }
]

export const pathnames = ["/home", "/headphones", "/speakers", "/earphones"]
