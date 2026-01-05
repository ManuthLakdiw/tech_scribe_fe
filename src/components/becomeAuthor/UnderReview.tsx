import {Clock} from "lucide-react";
import {motion} from "framer-motion";
import {
    ArrowRight
} from "lucide-react"

const UnderReview = () => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 50,
                scale: 0.9
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}
            transition={{
                duration: 0.6,
                ease: "easeOut"
            }}
            className={"w-full min-h-[324px] bg-neutral-100 dark:bg-dark-secondary/40 shadow-xl rounded-xl border border-neutral-soft dark-border py-6"}>
            <div className={"p-6 md:p-8 text-center"}>
                <div className={"w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4"}>
                    <Clock className={"w-8 h-8 text-yellow-500 dark:text-yellow-400"}/>
                </div>
                <h2 className={"text-xl font-bold mb-2"}>Application Under Review</h2>
                <p className={"text-muted-foreground mb-6"}>
                    Your author request is being reviewed by our team. We'll notify you via email once a decision has been made. This usually takes 1-3 business days.
                </p>
                <div className={"flex flex-col sm:flex-row gap-3 justify-center"}>
                    <button
                        className={"text-dark-secondary dark:text-light-secondary border border-neutral-soft dark-border  " +
                            "bg-light-secondary dark:bg-overlay-light hover:bg-neutral-soft/5 dark:hover:bg-white/8 rounded-full cursor-pointer w-full py-2.5 md:py-3 " +
                            "flex items-center justify-center gap-4 shadow-md"}
                    >
                        <p className={"uppercase text-xs font-medium tracking-wide"}>View Profile</p>

                    </button>
                    <button
                        className={"text-light-secondary dark:text-dark-secondary bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 rounded-full cursor-pointer w-full py-2.5 md:py-3 flex items-center justify-center gap-4 shadow-md"}
                    >
                        <p className={"uppercase text-xs font-medium tracking-wide"}>Browse Articles</p>
                        <ArrowRight className={"w-4 h-4"}/>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
export default UnderReview
