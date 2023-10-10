interface TitleSectionProps {
    title: string
}

export function TitleSection({ title }: TitleSectionProps) {
    return (
        <section className="title-section">
            <div className="title-section__inner-container">
                <h1 className="title-section__title">{title}</h1>
            </div>
        </section>
    )
}
