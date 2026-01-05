import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}

                        className="absolute bottom-full mb-2 px-2 py-1 text-[0.7rem] font-light text-light-primary bg-dark-primary dark:bg-light-primary dark:text-dark-primary  rounded-lg shadow-lg whitespace-nowrap z-40 pointer-events-none"
                    >
                        {text}

                        {/*<div*/}
                        {/*    className="absolute left-1/2 -translate-x-1/2 top-[99%] w-2.5 h-2.5 bg-neutral-900 dark:bg-white rotate-45"*/}
                        {/*></div>*/}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;