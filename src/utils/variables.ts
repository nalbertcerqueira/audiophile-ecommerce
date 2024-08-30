import HeadphoneThumb from "/public/imgs/headphones-thumbnail.png"
import SpeakerThumb from "/public/imgs/speakers-thumbnail.png"
import EarphoneThumb from "/public/imgs/earphones-thumbnail.png"

export const textMatchRegexp = /\D/g
export const zipCodeRegexp = /^(\d{5})(\d{1,3})$/g
export const creditCardRegexp = /(\d{4})/g

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
