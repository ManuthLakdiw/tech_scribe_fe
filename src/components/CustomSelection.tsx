import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Filter, type LucideIcon } from "lucide-react";
import { cn } from "../utils/cnUtil";

interface CustomSelectProps {
    options: string[];
    placeholder?: string;
    onChange?: (value: string) => void;
    className?: string;
    className2?: string;
    isShowIcon?: boolean;
    icon?: LucideIcon;
    required?: boolean;
    value?: string;
}

const CustomSelect = ({
                          options,
                          placeholder = "Select Option",
                          onChange,
                          className,
                          className2,
                          isShowIcon = true,
                          icon: Icon = Filter,
                          required = false, // Default false
                          value // Parent එකෙන් එන අගය
                      }: CustomSelectProps) => {

    const [isOpen, setIsOpen] = useState(false);

    // 👇 Internal state එක හෝ Parent value එක පාවිච්චි කරන්න
    const [internalSelected, setInternalSelected] = useState<string>(placeholder);

    // ඇත්තටම තෝරාගෙන ඇති අගය (Value එකක් එවා නැත්නම් placeholder එක පෙන්වන්න)
    const currentSelection = value || internalSelected;

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: string) => {
        setInternalSelected(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option);
        }
    };

    const isPlaceholderSelected = currentSelection === placeholder || currentSelection === "";

    return (
        <div className={cn("relative w-fit min-w-[120px]", className)} ref={containerRef}>

            <input
                tabIndex={-1}
                autoComplete="off"
                style={{
                    opacity: 0,
                    height: 1,
                    position: "absolute",
                    zIndex: -1,
                    bottom: 0
                }}
                value={isPlaceholderSelected ? "" : currentSelection}
                onChange={() => {}}
                required={required}
            />

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between gap-3",
                    "text-sm font-light",
                    "py-[0.47rem] px-3 rounded-lg",
                    "border dark-border border-neutral-strong/20",
                    "bg-light-secondary dark:bg-overlay-light",

                    isPlaceholderSelected
                        ? "text-neutral-strong dark:text-neutral-medium"
                        : "text-dark-secondary dark:text-light-secondary",

                    "shadow-xs transition-all duration-300",
                    className2
                )}
            >

                {isShowIcon ? (
                    <div className="flex items-center gap-[10px] truncate">
                    <span className="text-neutral-strong dark:text-neutral-medium">
                        <Icon className="w-3.5 h-3.5" />
                    </span>

                        <span className="truncate">{currentSelection}</span>
                    </div>
                ) : (<span className="truncate">{currentSelection}</span>)}


                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4 opacity-50" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}

                        className="absolute z-50 w-full mt-1 overflow-hidden bg-light-secondary dark:bg-dark-secondary border
                        border-neutral-soft dark-border rounded-lg shadow-sm max-h-60 overflow-y-auto p-1 min-w-full w-max right-0"
                    >
                        {options.map((option) => (
                            <li
                                key={option}
                                onClick={() => handleSelect(option)}
                                className={cn(
                                    "relative flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors",
                                    "hover:bg-neutral-100 dark:hover:bg-overlay-light rounded-lg mt-1 whitespace-nowrap",
                                    currentSelection === option
                                        ? "text-dark-secondary dark:text-light-secondary font-medium bg-neutral-100 dark:bg-overlay-light"
                                        : "text-neutral-strong  dark:text-neutral-soft"
                                )}
                            >
                                {option}

                                {currentSelection === option && (
                                    <motion.div layoutId="check">
                                        <Check className="w-3.5 h-3.5 text-neutral-strong dark:text-neutral-medium" />
                                    </motion.div>
                                )}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomSelect;