import { motion } from "framer-motion";
import ResponsiveGrid from "./ResponsiveGrid.tsx";

const CardLoading = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full min-h-full"
        >
            <ResponsiveGrid gap={4}>
                {Array(8).fill(0).map((_, key) => (
                    <div
                        key={key}
                        className="h-[350px]
                                   bg-white dark:bg-[#1C1C1C]
                                   rounded-xl
                                   border border-neutral-200 dark:border-white/10
                                   overflow-hidden relative
                                   animate-pulse"

                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 dark:via-white/5 to-transparent"
                            animate={{
                                x: ["-100%", "100%"]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear",
                                delay: key * 0.1
                            }}
                        />

                        <div
                            className="
                                w-full h-[160px]
                                bg-neutral-200 dark:bg-[#2A2A2A]
                                absolute top-8
                            "
                        />

                        <div className="absolute bottom-5 px-5 w-full space-y-3">
                            <div
                                className="
                                    w-1/2 h-5
                                    bg-neutral-200 dark:bg-[#2A2A2A]
                                    rounded-md
                                "
                            />

                            <div
                                className="
                                    w-full h-7
                                    bg-neutral-200 dark:bg-[#2A2A2A]
                                    rounded-md
                                "
                            />

                            <div
                                className="
                                    w-2/3 h-4
                                    bg-neutral-200 dark:bg-[#2A2A2A]
                                    rounded-md
                                "
                            />
                        </div>
                    </div>
                ))}
            </ResponsiveGrid>
        </motion.div>
    );
};

export default CardLoading;