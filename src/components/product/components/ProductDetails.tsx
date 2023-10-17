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
    function renderAccessories(): JSX.Element[] | undefined {
        if (accessories) {
            return accessories.map((accessory, i) => (
                <li key={i} className="product-details__accessory">
                    <span className="product-details__qty">{accessory.quantity}x</span>
                    {accessory.item}
                </li>
            ))
        }
    }

    function renderFeatures(): JSX.Element[] {
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
            <div>
                <h3 className="product-details__title">FEATURES</h3>
                {renderFeatures()}
            </div>
            <div>
                <h3 className="product-details__title">IN THE BOX</h3>
                <ul className="product-details__accessories">{renderAccessories()}</ul>
            </div>
        </div>
    )
}
