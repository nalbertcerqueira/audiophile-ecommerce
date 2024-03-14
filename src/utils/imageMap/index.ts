import { yx1Earphones } from "./earphones/index"
import { zx7Headphones, zx9Headphones } from "./speakers/index"
import {
    xx59Headphones,
    xx99MarkOneHeadphones,
    xx99MarkTwoHeadphones
} from "./headphones/index"

import { StaticImageMap } from "./types"

//Agrupando todas a imagens relacionadas a cada produto para conseguir buscar com mais facilidade
//de forma dinâmica, além de obter o benefício da otimização de imagens do Next.

export const staticProductImages: StaticImageMap = {
    ...yx1Earphones,
    ...zx7Headphones,
    ...zx9Headphones,
    ...xx59Headphones,
    ...xx99MarkOneHeadphones,
    ...xx99MarkTwoHeadphones
}
