import {Handshake} from "lucide-react";
import ResponsiveGrid from "../ResponsiveGrid.tsx";
import { motion } from "framer-motion";


const TopAuthorsSec = () => {
    return (
        <section  className={"w-full min-h-[50vh] px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary overflow-hidden flex flex-col items-center theme-transition"}>
            <div className={"mb-12 w-full flex flex-col items-center text-center"}>
                <div className={"inline-flex items-center gap-2 py-1 px-3 rounded-lg border border-neutral-200 mb-2" +
                    "text-dark-secondary font-secondary uppercase text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                    <Handshake strokeWidth={2} size={13} />
                    <h3 className={"font-medium"}>community</h3>
                </div>
                <h2 className={"text-2xl sm:text-3xl font-bold dark:text-light-secondary mb-4"}>Top Authors</h2>
                <p className={"text-neutral-strong font-light text-sm sm:text-base"}>Learn from industry experts and experienced developers</p>
            </div>
            <ResponsiveGrid defCols={1} smCols={2} mdCols={3}  lgCols={4}  className={"gap-4 md:gap-6"}>
                {Array(6).fill(0).map((_, index) => (
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

                        key={index} className={"group w-full h-[294.5px] bg-light-secondary dark:bg-dark-secondary rounded-xl border border-neutral-soft dark-border shadow-sm py-12 px-6  hover:shadow-lg"}>
                        <div
                            className={"w-16 h-16 md:w-22 md:h-22 rounded-full mx-auto mb-3 md:mb-4 ring-4 ring-dark-secondary/5 dark:ring-light-secondary/10 group-hover:ring-indigo-500/50 transition-all bg-cover bg-no-repeat"}
                            style={{
                                backgroundImage: `url(${"https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"})`
                            }}></div>
                        <h3 className="font-semibold text-sm md:text-base mb-1 group-hover:text-indigo-500 transition-colors text-dark-secondary text-center dark:text-light-secondary" >Sarah Chen</h3>
                        <div className={"font-secondary font-light uppercase text-[0.78rem] rounded-lg  bg-dark-secondary/5 tracking-widest py-[0.1rem] px-3 w-fit mx-auto mb-2 dark:text-light-secondary dark:bg-overlay-light"}>
                            admin
                        </div>
                        <p className={"text-neutral-strong text-sm line-clamp-2 text-center font-light dark:text-neutral-medium"}>Platform administrator and tech enthusiast</p>
                    </motion.div>
                ))}

            </ResponsiveGrid>
        </section>
    )
}
export default TopAuthorsSec
