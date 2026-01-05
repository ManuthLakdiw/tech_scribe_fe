import {type LucideIcon} from "lucide-react";
import {cn} from "@/utils/cnUtil.ts";
import {Link} from "react-router-dom";

interface NavBtnProps {
    icon: LucideIcon;
    text: string;
    className?: string;
    pathname: string;
    isSelected?: boolean;
    onClick?: () => void;
}

const NavBtn = ({icon:Icon, text, className, pathname, isSelected = false, onClick}: NavBtnProps) => {
    return (
        <Link
            to={pathname}
            onClick={onClick}
            className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-strong dark:text-neutral-medium " +
            "hover:bg-accent hover:text-dark-secondary dark:hover:text-light-secondary transition-colors",
            {"bg-accent text-dark-secondary dark:text-light-secondary": isSelected},
            className
        )}>
            <Icon className={"w-5 h-5"} />
            {text}
        </Link>
    )
}
export default NavBtn
