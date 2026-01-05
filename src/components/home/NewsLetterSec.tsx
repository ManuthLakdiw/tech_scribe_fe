import { motion } from "framer-motion";
import {MailSearch} from "lucide-react";
import {useRef} from "react";

const NewsLetterSec = () => {
    const dragConstraints = useRef(null)
    return (
        <motion.section
            ref={dragConstraints}
            initial={{
                opacity: 0,
                y: 50,
                scale: 0.9
            }}

            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
            }}

            transition={{
                duration: 0.6,
                ease: "easeOut"
            }}

            viewport={{
                once: false,
                amount: 0.3
            }}
            className={"w-full min-h-[50vh] px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-neutral-100 dark:bg-dark-secondary/40 overflow-hidden theme-transition"}>
            <motion.div
                drag
                dragConstraints={dragConstraints}
                dragTransition={{
                    bounceStiffness: 600,
                    bounceDamping: 10
                }}
                dragSnapToOrigin={true}
                className={"max-w-[896px] min-h-[364.5px] rounded-xl py-[72px] px-12 shadow-sm " +
                "bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 mx-auto flex flex-col items-center"}
            >
                <div className={"inline-flex items-center gap-2 py-1 px-3 rounded-lg border bg-light-secondary dark:bg-overlay-light dark-border border-neutral-200 mb-2" +
                    "text-dark-secondary font-secondary uppercase text-[0.7rem] tracking-widest mb-4 dark-border dark:text-light-secondary"}>
                    <MailSearch strokeWidth={2} size={13} />
                    <h3 className={"font-medium"}>newsletter</h3>
                </div>
                <h2 className={"text-2xl sm:text-3xl font-bold dark:text-light-secondary mb-4"}>Stay Updated</h2>
                <p className={"text-neutral-strong dark:text-neutral-medium font-light text-sm sm:text-base mb-8 text-center"}>
                    Get the latest articles, tutorials, and developer insights delivered to your inbox.
                </p>
                <div className={"w-full flex justify-center"}>
                    <div className={"w-full flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0"}>
                        <input
                            type={"email"}
                            placeholder={"Enter your email"}
                            className="
                                w-full sm:w-80
                                text-sm
                                font-light
                                border dark-border py-[0.55rem] px-4 rounded-lg sm:rounded-r-none
                                border-neutral-strong/20
                                bg-light-secondary dark:bg-overlay-light
                                text-dark-secondary dark:text-light-secondary
                                placeholder:text-neutral-strong
                                dark:placeholder:text-neutral-medium
                                focus:outline-1
                                focus:outline-neutral-strong/50
                                focus:ring-4
                                focus:ring-neutral-strong/30
                                dark:focus:ring-neutral-strong/60
                                focus:ring-offset-0
                                transition-all duration-300 ease-in-out
                            "
                        />
                        <button className={"w-full sm:w-auto block font-secondary uppercase text-[0.65rem] tracking-widest py-3 px-6 " +
                            "text-light-secondary dark:text-dark-secondary bg-dark-secondary dark:bg-light-secondary rounded-lg sm:rounded-l-none cursor-pointer transition-all duration-300 ease-in-out"}>
                            Subscribe
                        </button>
                    </div>
                </div>
                <p className={"mt-4 text-xs text-neutral-strong dark:text-neutral-medium"}>No spam, unsubscribe anytime.</p>
            </motion.div>
        </motion.section>

        )
}
export default NewsLetterSec
