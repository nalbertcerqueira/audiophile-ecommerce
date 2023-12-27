export function TitleSection({ title }: { title: string }) {
    return (
        <section className="title-section">
            <div className="title-section__inner-container">
                <span className="title-section__division" />
                <h1 className="title-section__title">{title}</h1>
            </div>
        </section>
    )
}
