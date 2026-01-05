
interface RelatedBlogCardProps {
    imgSrc: string;
    blogTitle: string;
    imgAlt?: string;
}

const RelatedBlogCard = ({imgSrc, blogTitle, imgAlt}: RelatedBlogCardProps) => {
    return (
        <div className={"bg-light-secondary dark:bg-dark-secondary border border-neutral-soft dark-border text-dark-secondary dark:text-light-secondary overflow-hidden cursor-pointer " +
            "flex flex-col gap-6 rounded-xl py-6 shadow-sm h-full hover:shadow-lg transition-shadow group theme-transition"}>
            <img
                src={imgSrc}
                alt= {imgAlt ?? blogTitle}
                className={"object-cover group-hover:scale-105 transition-transform duration-500 w-full h-32"}
            />
            <div className={"p-4"}>
                <h3 className={"font-semibold line-clamp-2 group-hover:text-indigo-500 transition-colors"}>{blogTitle}</h3>
            </div>

        </div>
    )
}
export default RelatedBlogCard
