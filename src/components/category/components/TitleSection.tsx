export function TitleSection({ title }: { title: string }) {
    return (
        <section className="title-section">
            <div className="title-section__inner-container">
                <h1 className="title-section__title">{title}</h1>
            </div>
        </section>
    )
}
