import HeadphoneThumb from "/public/imgs/headphones-thumbnail.png"
import SpeakerThumb from "/public/imgs/speakers-thumbnail.png"
import EarphoneThumb from "/public/imgs/earphones-thumbnail.png"
import { CategoryItem, CategoryProps } from "./CategoryItem"

type Category = CategoryProps

export function CategorySection({ className }: { className?: string }) {
    const categories: Category[] = [
        {
            name: "headphones",
            link: "/headphones",
            thumb: HeadphoneThumb,
            thumbAlt: "a black headset with golden details"
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

    return (
        <section className="categories">
            <div className={`categories__inner-container ${className || ""}`.trim()}>
                {categories.map((categoryData) => (
                    <CategoryItem key={categoryData.name} {...categoryData} />
                ))}
            </div>
        </section>
    )
}
