import { BarLoader } from "@/components/shared/loaders/BarLoader"
import { SectionContent } from "@/components/shared/SectionContent"
import { PageLoaderContainer } from "@/components/shared/loaders/PageLoaderContainer"

export function TabLoader() {
    return (
        <SectionContent>
            <PageLoaderContainer className="tab-loader">
                <BarLoader />
            </PageLoaderContainer>
        </SectionContent>
    )
}
