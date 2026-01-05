import type { ReactNode } from "react";
import { cn } from "../utils/cnUtil";
import { motion } from "framer-motion";


const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    }
};


const gapClasses: Record<number, string> = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12"
};

const defColsMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
};


const smColsMap: Record<number, string> = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
    6: "sm:grid-cols-6",
    7: "sm:grid-cols-7",
    8: "sm:grid-cols-8",
    9: "sm:grid-cols-9",
    10: "sm:grid-cols-10",
    11: "sm:grid-cols-11",
    12: "sm:grid-cols-12",
};

const mdColsMap: Record<number, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
    7: "md:grid-cols-7",
    8: "md:grid-cols-8",
    9: "md:grid-cols-9",
    10: "md:grid-cols-10",
    11: "md:grid-cols-11",
    12: "md:grid-cols-12"
};

const lgColsMap: Record<number, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
    7: "lg:grid-cols-7",
    8: "lg:grid-cols-8",
    9: "lg:grid-cols-9",
    10: "lg:grid-cols-10",
    11: "lg:grid-cols-11",
    12: "lg:grid-cols-12"
};


interface ResponsiveGridProps {
    children?: ReactNode;
    gap?: number;
    defCols?: number;
    smCols?: number;
    mdCols?: number;
    lgCols?: number;
    className?: string;

}

const ResponsiveGrid = ({
                            children,
                            gap = 4,
                            defCols = 1,
                            smCols,
                            mdCols,
                            lgCols,
                            className

}: ResponsiveGridProps) => {

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            // layout={true}
            className={cn(
                "grid w-full h-full",
                defColsMap[defCols],
                smCols && smColsMap[smCols],
                mdCols && mdColsMap[mdCols],
                lgCols && lgColsMap[lgCols],
                gapClasses[gap],
                className
            )}
        >
            {children}
        </motion.div>
    )
}

export default ResponsiveGrid;