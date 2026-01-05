import { X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const NotApproved = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={"w-full min-h-[324px] bg-neutral-100 dark:bg-dark-secondary/40 shadow-xl rounded-xl border border-neutral-soft dark-border py-6"}
        >
            <div className={"p-6 md:p-8 text-center flex flex-col items-center"}>
                <div className={"w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4"}>
                    <X className={"w-8 h-8 text-red-500 dark:text-red-400"}/>
                </div>
                <h2 className={"text-xl font-bold mb-2"}>Application Not Approved</h2>
                <p className={"text-muted-foreground mb-6"}>
                    Unfortunately, your previous application was not approved. You may submit a new application with updated information.
                </p>

                <button
                    className={"text-light-secondary dark:text-dark-secondary bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 rounded-full cursor-pointer w-fit px-4 py-2.5 md:py-3 flex items-center justify-center gap-4 shadow-md"}
                >
                    <p className={"uppercase text-xs font-medium tracking-wide"}>Submit new application</p>
                    <ArrowRight className={"w-4 h-4"}/>
                </button>
            </div>
        </motion.div>
    )
}
export default NotApproved;