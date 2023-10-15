import { Counter } from "../Counter"
import ItemThumb from "/public/imgs/cart/xx99-mark-two-headphones.jpg"
import Image from "next/image"

export function CartItem({ readOnly }: { readOnly?: boolean }) {
    return (
        <div className="cart-item">
            <Image className="cart-item__thumb" src={ItemThumb} alt="product item" />
            <div className="cart-item__info">
                <div>
                    <p className="cart-item__name">XX99 MK II</p>
                    <p className="cart-item__price">$ 2,999</p>
                </div>
                {readOnly && <p className="cart-item__qty">x1</p>}
            </div>
            {!readOnly && <Counter className="cart-item__counter" />}
        </div>
    )
}
