import { categories } from "@/utils/variable"
import { CategoryItem } from "../CategoryItem"

export function CategorySection({ className }: { className?: string }) {
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
