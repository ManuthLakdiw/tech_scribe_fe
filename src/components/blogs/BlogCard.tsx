import {memo} from "react";
import {motion} from "framer-motion";
import {Clock, Eye, Heart} from "lucide-react";
import formatReadingTime from "../../utils/FormatReadingTimeUtil.ts";
import formatDate from "../../utils/FormatDateUtil.ts";

interface BlogCardProps {
    title: string;
    description: string;
    blogImage: string;
    postedDate: string | Date;
    readTime: number;
    views: number;
    likes: number;
    category?: string;
    isFeatured?: boolean;
}

const BlogCard = memo(({
                           blogImage,
                           postedDate,
                           readTime,
                           views,
                           likes,
                           title,
                           description,
                           category,
                           isFeatured = false
                       }: BlogCardProps) => {

    return (
        <motion.div
            whileHover={{
                y: -5,
                transition: {
                    duration: 0.1,
                    ease: "easeInOut"
                }
            }}
            className={"group w-full h-[488px] border border-neutral-soft shadow-sm bg-light-secondary rounded-xl " +
                "overflow-hidden  hover:shadow-lg transition-all duration-300 relative dark:bg-dark-secondary dark-border cursor-pointer theme-transition"
            }>
            <div className={"relative top-7 overflow-hidden"}>
                <div
                    className="w-full h-[200px] bg-cover bg-center bg-no-repeat group-hover:scale-105 transform transition-all duration-300 overflow-hidden"
                    style={{backgroundImage: `url(${blogImage})`}}
                ></div>
            </div>
            {isFeatured && (
                <div
                    className="py-1 px-3 rounded-lg shadow-sm absolute right-3 top-10
                    font-secondary uppercase text-[0.65rem] tracking-widest w-fit font-medium
                    bg-indigo-500 text-light-secondary backdrop-blur-sm"
                >
                    <h3>featured</h3>
                </div>
            )}

            <div className="px-4 py-10 w-full h-[274px] relative top-7">
                <div className={"mb-3"}>
                    {category && (
                        <span className={"inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs " +
                            "text-dark-secondary dark:text-light-secondary bg-dark-secondary/5 dark:bg-overlay-light" +
                            " font-medium w-fit whitespace-nowrap"}
                        >
                           {category}
                       </span>
                    )}
                    <span className={"text-xs text-neutral-strong dark:text-neutral-medium ml-3"}>{formatDate(postedDate)}</span>
                </div>
                <p className={"text-lg font-semibold mb-2 group-hover:text-indigo-500 line-clamp-2 transition-all duration-300 cursor-pointer dark:text-light-secondary"}>{title}</p>
                <p className={"text-sm text-neutral-strong line-clamp-2 mb-6 dark:text-neutral-medium"}>{description}</p>
                <div className={"flex items-center gap-4 text-neutral-strong dark:text-neutral-medium text-sm"}>
                    <div className={"flex items-center gap-1"}>
                        <Clock strokeWidth={2} size={17} />
                        <p>{formatReadingTime(readTime)}</p>
                    </div>
                    <div className={"flex items-center gap-1"}>
                        <Eye strokeWidth={2} size={17} />
                        <p>{views}</p>
                    </div>
                    <div className={"flex items-center gap-1"}>
                        <Heart strokeWidth={2} size={17} />
                        <p>{likes}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
})
export default BlogCard;