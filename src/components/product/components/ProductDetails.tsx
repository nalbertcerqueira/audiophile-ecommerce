import { Fragment } from "react"

interface AccessoryItem {
    item: string
    quantity: number
}

interface ProductDetailsProps {
    features: string
    accessories?: AccessoryItem[]
}

export function ProductDetails({ features, accessories }: ProductDetailsProps) {
    function renderAccessories() {
        if (accessories) {
            return accessories.map((accessory, i) => (
                <li key={i} className="product-details__accessory">
                    <span
                        aria-label={`${accessory.quantity}`}
                        className="product-details__qty"
                    >
                        {accessory.quantity}x
                    </span>
                    {accessory.item}
                </li>
            ))
        }
    }

    function renderFeatures() {
        return features.split("\n\n").map((paragraph, i, array) => {
            if (!array[i + 1]) {
                return (
                    <p key={i} className="product-details__text">
                        {paragraph}
                    </p>
                )
            }
            return (
                <Fragment key={i}>
                    <p className="product-details__text">{paragraph}</p>
                    <br />
                </Fragment>
            )
        })
    }

    return (
        <div className="product-details">
            <div className="product-details__about">
                <h2 className="product-details__title">FEATURES</h2>
                <div>{renderFeatures()}</div>
            </div>
            <div className="product-details__wrapper">
                <h2 className="product-details__title">IN THE BOX</h2>
                <ul className="product-details__accessories">{renderAccessories()}</ul>
            </div>
        </div>
    )
}
