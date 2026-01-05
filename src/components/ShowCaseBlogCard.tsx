import {Calendar, Clock, Eye, Heart} from "lucide-react";
import formatDate from "../utils/FormatDateUtil.ts";
import { motion } from "framer-motion";
import formatReadingTime from "../utils/FormatReadingTimeUtil.ts";
import {memo} from "react";

interface BlogCardProps {
    title: string;
    description: string;
    blogImage: string;
    author: string;
    authorProfileImage?: string;
    postedDate: string | Date;
    readTime: number;
    views: number;
    likes: number;
}

const ShowCaseBlogCard = memo(({
                      blogImage,
                      author,
                      authorProfileImage,
                      postedDate,
                      readTime,
                      views,
                      likes,
                      title,
                      description
}: BlogCardProps) => {

    const profImage = authorProfileImage ? authorProfileImage : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
    return (
        <motion.div
            whileHover={{
                y: -5,
                transition: {
                    duration: 0.1,
                    ease: "easeInOut"
                }
            }}
            className={"group w-full h-[502px] border border-neutral-soft shadow-sm bg-light-secondary rounded-xl " +
                "overflow-hidden  hover:shadow-lg transition-all duration-300 relative dark:bg-dark-secondary dark-border theme-transition"
        }>
            <div className={"relative top-7 overflow-hidden"}>
                <div
                    className="w-full h-[200px] bg-cover bg-center bg-no-repeat group-hover:scale-105 transform transition-all duration-300 overflow-hidden"
                    style={{backgroundImage: `url(${blogImage})`}}
                ></div>
            </div>
            <div
                className="py-1 px-3 rounded-lg shadow-sm absolute right-3 top-10
                    font-secondary uppercase text-[0.65rem] tracking-widest w-fit font-medium
                    bg-indigo-500 text-light-secondary backdrop-blur-sm"
            >
                <h3>featured</h3>
            </div>

            <div className="px-4 py-10 w-full h-[274px]  relative top-7">
                <div className="flex items-center gap-3 mb-3">
                    <div
                        className={"w-[30px] h-[30px] rounded-full bg-center bg-cover bg-no-repeat"}
                        style={{backgroundImage: `url(${profImage})`}}
                    >

                    </div>
                    <div className={"flex flex-col items-start"}>
                        <h6 className={"text-sm font-medium text-dark-secondary dark:text-light-secondary"}>{author}</h6>
                        <div className={"flex items-center gap-1 text-xs text-neutral-strong dark:text-neutral-medium"}>
                            <Calendar strokeWidth={2} size={12} />
                            <p>{formatDate(postedDate)}</p>
                        </div>
                    </div>
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
export default ShowCaseBlogCard;