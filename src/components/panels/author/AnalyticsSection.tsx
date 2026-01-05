import {motion} from "framer-motion";
import ResponsiveGrid from "@/components/ResponsiveGrid.tsx";
import {cn} from "@/utils/cnUtil.ts";
import {AccountAreaChart} from "@/components/AccountAreaChart.tsx";

const popularPosts = [
    {
        id: 1,
        title: "Next.js 14 App Router: Everything You Need to Know",
        views: 2100,
        likes: 120
    },
    {
        id: 2,
        title: "Mastering React Server Components in 2024",
        views: 1540,
        likes: 85
    },
    {
        id: 3,
        title: "Tailwind CSS v4: What's New and Changed?",
        views: 3200,
        likes: 245
    },
    {
        id: 4,
        title: "Understanding TypeScript Generics for Beginners",
        views: 900,
        likes: 45
    },
    {
        id: 5,
        title: "Docker Optimization Tips for Node.js Apps",
        views: 1850,
        likes: 110
    }
];

const AnalyticsSection = () => {
    return (
        <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            <ResponsiveGrid defCols={1} mdCols={2} className={"gap-6"}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={"bg-light-secondary dark:bg-dark-secondary text-card-foreground " +
                        "flex flex-col gap-6 rounded-xl border border-neutral-soft dark-border py-6 px-6 shadow-sm"}
                >
                    <h3 className={"text-dark-secondary dark:text-light-secondary leading-none font-semibold"}>Top
                        Performing Posts</h3>
                    <div className="flex flex-col gap-1.5">
                        {popularPosts.map((post, index) => (
                            <div
                                key={post.id}
                                className={cn(
                                    "flex items-center justify-between py-3  dark-border border-neutral-soft",
                                    index === popularPosts.length - 1 ? "" : "border-b"
                                )}
                            >
                                <div className={"flex items-center gap-3"}>
                                                            <span className={"text-2xl font-bold text-muted-foreground"}>
                                                                {index + 1}
                                                            </span>
                                    <div>
                                        <p className={"font-medium truncate max-w-[200px] md:max-w-xs"}>
                                            {post.title}
                                        </p>
                                        <p className={"text-sm text-muted-foreground"}>
                                            {post.views} views . {post.likes} likes
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={"bg-light-secondary dark:bg-dark-secondary text-card-foreground " +
                        "flex flex-col gap-6 rounded-xl border border-neutral-soft dark-border py-6 px-6 shadow-sm"}
                >
                    <h3 className={"text-dark-secondary dark:text-light-secondary leading-none font-semibold"}>Recent
                        Activity</h3>
                    <div className="flex flex-col gap-1.5">
                        {popularPosts.map((post, index) => (
                            <div
                                key={post.id}
                                className={cn(
                                    "flex items-center justify-between py-3  dark-border border-neutral-soft",
                                    index === popularPosts.length - 1 ? "" : "border-b"
                                )}
                            >
                                <div className={"flex items-center gap-3"}>
                                    <div className={"w-2 h-2 rounded-full bg-green-500"}></div>
                                    <div>
                                        <p className={"font-medium truncate max-w-[200px] md:max-w-xs"}>
                                            {post.title}
                                        </p>
                                        <p className={"text-sm text-muted-foreground"}>
                                            published 3/10/2024
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </ResponsiveGrid>

            <div className={"mt-8"}>
                <AccountAreaChart />
            </div>
        </motion.div>
    )
}
export default AnalyticsSection
