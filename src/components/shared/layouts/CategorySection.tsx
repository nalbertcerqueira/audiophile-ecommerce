import { categories } from "@/utils/variables"
import { CategoryItem } from "../CategoryItem"

export function CategorySection({ className }: { className?: string }) {
    return (
        <section aria-label="Audiophile product categories" className="categories">
            <div className={`categories__inner-container ${className || ""}`.trim()}>
                {categories.map((categoryData) => (
                    <CategoryItem key={categoryData.name} {...categoryData} />
                ))}
            </div>
        </section>
    )
}
