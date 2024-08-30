import { SectionContent } from "@/components/shared/SectionContent"
import { NotFoundContent } from "@/components/errors/components/NotFoundContent"

export function TabNotFound() {
    return (
        <SectionContent>
            <NotFoundContent className="tab-not-found" />
        </SectionContent>
    )
}
