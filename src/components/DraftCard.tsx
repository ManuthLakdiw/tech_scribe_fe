import {Eye, SquarePen, Trash2} from "lucide-react";

interface DraftCardProps {
    title: string;
    lastEdited?: string;
    completion?: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

const DraftCard = ({title, lastEdited, completion, onEdit, onDelete}: DraftCardProps) => {
    return (
        <div className={"flex flex-col sm:flex-row sm:items-center justify-between p-6 border rounded-lg hover:bg-accent/50 transition-colors gap-4"}>
            <div className={"flex-1 min-w-0"}>
                <div className={"flex flex-wrap items-center gap-2 mb-5 md:mb-2"}>
                    <h3 className={"font-semibold truncate text-base md:text-lg"}>
                        {title}
                    </h3>
                </div>
                <div className={"flex flex-wrap items-center gap-3 md:gap-5 text-xs text-muted-foreground"}>
                    <span>Edited {lastEdited}</span>
                    <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                    <span>{completion} complete</span>
                </div>
            </div>

            <div className={"flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start"}>
                <button className={"inline-flex items-center justify-center text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-md transition-colors cursor-pointer"}>
                    <Eye className={"w-4 h-4"} />
                </button>

                <button
                    onClick={onEdit}
                    className={"inline-flex items-center justify-center text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-md transition-colors cursor-pointer"}>
                    <SquarePen className={"w-4 h-4"} />
                </button>

                <button
                    onClick={onDelete}
                    className={"inline-flex items-center justify-center text-sm font-medium hover:bg-destructive/10 hover:text-destructive h-8 w-8 rounded-md transition-colors cursor-pointer text-destructive"}>
                    <Trash2 className={"w-4 h-4"} />
                </button>
            </div>
        </div>
    )
}
export default DraftCard;