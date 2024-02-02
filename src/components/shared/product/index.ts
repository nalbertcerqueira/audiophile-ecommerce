import { ProductRoot } from "./ProductRoot"
import { ProductLabel } from "./ProductLabel"
import { ProductName } from "./ProductName"
import { ProductPrice } from "./ProductPrice"
import { AddProductAction } from "./ProductAction"
import { ProductDescription } from "./ProductDescription"
import { ProductLink } from "./ProductLink"

export const ProductItem = {
    Root: ProductRoot,
    Label: ProductLabel,
    Name: ProductName,
    Description: ProductDescription,
    Price: ProductPrice,
    Action: AddProductAction,
    Link: ProductLink
}
