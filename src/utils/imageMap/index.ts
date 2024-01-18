import { yx1Earphones } from "./earphones/index"
import { zx7Headphones, zx9Headphones } from "./speakers/index"
import {
    xx59Headphones,
    xx99MarkOneHeadphones,
    xx99MarkTwoHeadphones
} from "./headphones/index"

import { StaticImageMap } from "./types"

export const staticProductImages: StaticImageMap = {
    ...yx1Earphones,
    ...zx7Headphones,
    ...zx9Headphones,
    ...xx59Headphones,
    ...xx99MarkOneHeadphones,
    ...xx99MarkTwoHeadphones
}
