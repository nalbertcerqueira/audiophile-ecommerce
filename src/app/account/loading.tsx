import { PageLoaderContainer } from "@/components/shared/loaders/PageLoaderContainer"
import { BarLoader } from "@/components/shared/loaders/BarLoader"

export default function Loading() {
    return (
        <PageLoaderContainer>
            <BarLoader />
        </PageLoaderContainer>
    )
}
