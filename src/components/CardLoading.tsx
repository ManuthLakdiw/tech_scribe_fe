import { motion } from "framer-motion";
import ResponsiveGrid from "./ResponsiveGrid.tsx";




const CardLoading = ({numberOfCards = 8, xs, sm, md, lg, gap}:
                     {
                        numberOfCards:number
                        gap?:number
                        xs?:number
                        sm?:number,
                        md:number,
                        lg:number,
                     }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full min-h-full"
        >
            <ResponsiveGrid gap={gap} defCols={xs} smCols={sm} mdCols={md} lgCols={lg}>
                {Array(numberOfCards).fill(0).map((_, key) => (
                    <div
                        key={key}
                        className="h-[350px]
                                   bg-light-secondary dark:bg-dark-secondary
                                   rounded-xl
                                   border border-neutral-soft dark-border
                                   overflow-hidden relative
                                   animate-pulse theme-transition"

                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-overlay-light dark:via-overlay-light to-transparent"
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
                                bg-neutral-soft dark:bg-[#2A2A2A]
                                absolute top-8
                            "
                        />

                        <div className="absolute bottom-5 px-5 w-full space-y-3">
                            <div
                                className="
                                    w-1/2 h-5
                                    bg-neutral-soft dark:bg-[#2A2A2A]
                                    rounded-md
                                "
                            />

                            <div
                                className="
                                    w-full h-7
                                    bg-neutral-soft dark:bg-[#2A2A2A]
                                    rounded-md
                                "
                            />

                            <div
                                className="
                                    w-2/3 h-4
                                    bg-neutral-soft dark:bg-[#2A2A2A]
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