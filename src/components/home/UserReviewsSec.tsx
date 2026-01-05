import {Spotlight, Star} from "lucide-react";
import ResponsiveGrid from "../ResponsiveGrid.tsx";
import { motion } from "framer-motion";


const userReviews = [
    { name: "Alex M.", rating: 5, review: "Best technical blog platform I've used. Clean UI and great content." },
    { name: "Jordan P.", rating: 3, review: "The author dashboard is phenomenal. Makes writing so much easier." },
    { name: "Sam K.", rating: 4, review: "High-quality articles from real experts. Highly recommend!" },
];


const UserReviewsSec = () => {
    return (
        <section
            className={"w-full min-h-[50vh] px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary overflow-hidden flex flex-col items-center theme-transition"}>
            <div className={"mb-12 w-full flex flex-col items-center text-center"}>
                <div className={"inline-flex items-center gap-2 py-1 px-3 rounded-lg border border-neutral-200 mb-2" +
                    "text-dark-secondary font-secondary uppercase text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                    <Spotlight strokeWidth={2} size={13} />
                    <h3 className={"font-medium"}>spotlight</h3>
                </div>
                <h2 className={"text-2xl sm:text-3xl font-bold dark:text-light-secondary mb-4"}>Community Spotlight</h2>
                <p className={"text-neutral-strong font-light text-sm sm:text-base"}>Top stories from the voices that matter.</p>
            </div>
            <ResponsiveGrid defCols={1} smCols={2} mdCols={3} className={"gap-6"}>
                {userReviews.map((item , index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}

                        whileInView={{ opacity: 1, y: 0 }}

                        whileHover={{
                            y: -5,
                            transition: {
                                duration: 0.1,
                                ease: "easeInOut"
                            }
                        }}

                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: index * 0.1
                        }}

                        viewport={{ once: true, amount: 0.2 }}
                        className={"w-full min-h-[214px] bg-light-secondary dark:bg-dark-secondary border dark-border border-neutral-soft shadow-sm rounded-xl py-12 px-6"}
                        key={index}
                    >
                        <div className={"flex gap-1 mb-3"}>
                            {Array.from({ length: item.rating }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        opacity: [1, 0.4, 1],
                                        scale: [1, 0.85, 1],
                                    }}

                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.2
                                    }}
                                >
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                </motion.div>
                            ))}
                        </div>
                        <p className={"mb-4 text-neutral-strong dark:text-neutral-medium font-light"}>"{item.review}"</p>
                        <p className={"font-semibold text-dark-secondary dark:text-light-secondary"}>{item.name}</p>

                    </motion.div>
                ))}
            </ResponsiveGrid>

        </section>
    )
}
export default UserReviewsSec
