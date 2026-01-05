import { motion } from "framer-motion";
import ResponsiveGrid from "./ResponsiveGrid.tsx";

const AuthorCardLoading = ({ numberOfCards = 8, xs, sm, md, lg, gap }:
                           {
                               numberOfCards?: number,
                               gap?: number,
                               xs?: number,
                               sm?: number,
                               md?: number,
                               lg?: number,
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
                        className="h-[420px]
                                   bg-light-secondary dark:bg-dark-secondary
                                   rounded-xl
                                   border border-neutral-soft dark-border
                                   overflow-hidden relative
                                   flex flex-col items-center py-10 px-6 /* ඇතුලේ content මැදට ගත්තා */
                                   animate-pulse theme-transition"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-overlay-light dark:via-overlay-light to-transparent z-10"
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

                        <div className="w-24 h-24 rounded-full bg-neutral-soft dark:bg-[#2A2A2A] mb-5 shrink-0" />

                        <div className="w-32 h-6 rounded bg-neutral-soft dark:bg-[#2A2A2A] mb-2" />

                        <div className="w-24 h-4 rounded bg-neutral-soft dark:bg-[#2A2A2A] mb-4" />

                        <div className="w-16 h-5 rounded bg-neutral-soft dark:bg-[#2A2A2A] mb-6" />

                        <div className="w-full space-y-2 mb-auto flex flex-col items-center">
                            <div className="w-full h-3 rounded bg-neutral-soft dark:bg-[#2A2A2A]" />
                            <div className="w-5/6 h-3 rounded bg-neutral-soft dark:bg-[#2A2A2A]" />
                        </div>

                        <div className="w-full h-10 rounded-lg bg-neutral-soft dark:bg-[#2A2A2A]  mb-6 mt-4" />

                        <div className="flex gap-3 mt-auto">
                            <div className="w-8 h-8 rounded-full bg-neutral-soft dark:bg-[#2A2A2A] " />
                            <div className="w-8 h-8 rounded-full bg-neutral-soft dark:bg-[#2A2A2A]" />
                            <div className="w-8 h-8 rounded-full bg-neutral-soft dark:bg-[#2A2A2A]" />
                        </div>
                    </div>
                ))}
            </ResponsiveGrid>
        </motion.div>
    );
};

export default AuthorCardLoading;