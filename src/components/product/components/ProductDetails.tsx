export function ProductDetails() {
    const accessories = [
        { name: "Headphone Unit", qty: 1 },
        { name: "Replacement Earcups", qty: 2 },
        { name: "User Manual", qty: 1 },
        { name: "3.5mm 5m Audio Cable", qty: 1 },
        { name: "Travel Bag", qty: 1 }
    ]

    return (
        <div className="product-details">
            <div>
                <h3 className="product-details__title">FEATURES</h3>
                <p className="product-details__text">
                    Featuring a genuine leather head strap and premium earcups, these
                    headphones deliver superior comfort for those who like to enjoy endless
                    listening. It includes intuitive controls designed for any situation.
                    Whether you&#39;re taking a business call or just in your own personal
                    space, the auto on/off and pause features ensure that you&#39;ll never miss
                    a beat.
                </p>
                <br />
                <p className="product-details__text">
                    The advanced Active Noise Cancellation with built-in equalizer allow you to
                    experience your audio world on your terms. It lets you enjoy your audio in
                    peace, but quickly interact with your surroundings when you need to.
                    Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery
                    life, the XX99 Mark II headphones gives you superior sound, cutting-edge
                    technology, and a modern design aesthetic.
                </p>
            </div>
            <div>
                <h3 className="product-details__title">IN THE BOX</h3>
                <ul className="product-details__accessories">
                    {accessories.map((accessory, i) => (
                        <li key={i} className="product-details__accessory">
                            <span className="product-details__qty">{accessory.qty}x</span>
                            {accessory.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
