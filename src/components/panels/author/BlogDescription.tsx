import {Clock, Eye, Heart, MessageSquare, SquarePen, Trash2} from "lucide-react";


interface BlogDescriptionProps {
    to?: string;
    title: string;
    isPublished?: boolean;
    isFeatured?: boolean;
    date?: string;
    views?: number;
    likes?: number;
    comments?: number;
    readTime?: string;
    onEdit?: () => void;
    onDelete?: () => void;
    onView?: () => void;

}

const BlogDescription = (
    {title, date, comments, isPublished = false , isFeatured = false, readTime, views, likes, onEdit, onDelete, onView}: BlogDescriptionProps
) => {

    return (
        <div className={"flex flex-col sm:flex-row sm:items-center justify-between p-6 border rounded-lg hover:bg-accent/50 transition-colors gap-4"}>

            <div className={"flex-1 min-w-0"}>
                <div className={"flex flex-wrap items-center gap-2 mb-5 md:mb-2"}>
                    <h3
                        onClick={onView}
                        className={"font-semibold truncate text-base md:text-lg cursor-pointer"}>
                        {title}
                    </h3>

                    {isPublished && (
                        <span className={"inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-[10px] md:text-xs font-medium w-fit whitespace-nowrap shrink-0 overflow-hidden border-transparent bg-primary text-primary-foreground"}>
                            Published
                        </span>
                    )}

                    {isFeatured && (
                        <span className={"inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-[10px] md:text-xs font-medium w-fit whitespace-nowrap shrink-0 overflow-hidden border-transparent bg-secondary text-secondary-foreground"}>
                            Featured
                        </span>
                    )}

                </div>

                <div className={"flex flex-wrap items-center gap-3 md:gap-5 text-xs text-muted-foreground"}>
                    <span className={"flex items-center gap-1"}>
                        <Eye className={"w-3 h-3 md:w-4 md:h-4"} /> {views}
                    </span>
                    <span className={"flex items-center gap-1"}>
                        <Heart className={"w-3 h-3 md:w-4 md:h-4"} /> {likes}
                    </span>
                    <span className={"flex items-center gap-1"}>
                        <MessageSquare className={"w-3 h-3 md:w-4 md:h-4"} /> {comments}
                    </span>
                    <span className={"flex items-center gap-1"}>
                        <Clock className={"w-3 h-3 md:w-4 md:h-4"} /> {readTime}
                    </span>
                    <span className={"text-neutral-300 dark:text-neutral-700"}>|</span>
                    <span>{date}</span>
                </div>
            </div>


            <div className={"flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start"}>

                <button
                    onClick={onView}
                    className={"inline-flex items-center justify-center text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-md transition-colors cursor-pointer"}
                >
                    <Eye className={"w-4 h-4"} />
                </button>

                <button
                    onClick={onEdit}
                    className={"inline-flex items-center justify-center text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-md transition-colors cursor-pointer"}>
                    <SquarePen className={"w-4 h-4"} />
                </button>

                <button
                    onClick={onDelete}
                    className={"inline-flex items-center justify-center text-sm font-medium hover:bg-destructive/10 hover:text-destructive h-8 w-8 rounded-md transition-colors cursor-pointer text-destructive"}>
                    <Trash2 className={"w-4 h-4"} />
                </button>
            </div>
        </div>
    )
}
export default BlogDescription