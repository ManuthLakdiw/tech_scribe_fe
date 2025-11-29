import type {ReactNode} from "react";

interface ResponsiveGridProps {
    gap?: number,
    children?: ReactNode
}

const ResponsiveGrid = ({children, gap = 4}:ResponsiveGridProps) => {
    const gapClass = `gap-${gap}`;

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${gapClass}`}>
            {children}
        </div>
    )
}

export default ResponsiveGrid
