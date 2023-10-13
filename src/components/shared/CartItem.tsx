import { Counter } from "./Counter"
import ItemThumb from "/public/imgs/cart/xx99-mark-two-headphones.jpg"
import Image from "next/image"

export function CartItem() {
    return (
        <div className="cart-item">
            <Image className="cart-item__thumb" src={ItemThumb} alt="product item" />

            <div className="cart-item__info">
                <p className="cart-item__name">
                    <b>XX99 MK II</b>
                </p>
                <p className="cart-item__price">$ 2,999</p>
            </div>
            <Counter className="cart-item__counter" />
        </div>
    )
}
