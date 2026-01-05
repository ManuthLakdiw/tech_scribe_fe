import {Switch} from "@/components/ui/switch.tsx";

interface CommentCardProps {
    userImgSrc: string;
    userName: string;
    date: string;
    comment: string;
    isBlocked?: boolean;
}

const CommentCard = ({userImgSrc, userName, date, comment, isBlocked}:CommentCardProps) => {
    return (
        <div className={"flex items-start gap-4 p-4 border rounded-lg"}>
                                    <span className={"relative flex size-8 shrink-0 overflow-hidden rounded-full w-10 h-10"}>
                                        <img src={`${userImgSrc}`} alt={userName.charAt(0).toUpperCase()} className={"aspect-square size-full"}/>
                                    </span>
            <div className={"flex-1"}>
                <div className={"flex items-center gap-2 mb-1"}>
                    <span className={"font-semibold"}>{userName}</span>
                    <span className={"text-xs text-muted-foreground"}>{date}</span>
                    <span className={"inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 " +
                        "overflow-hidden border-transparent bg-primary text-primary-foreground"}>
                                                Approved
                                            </span>
                </div>
                <p className={"text-muted-foreground"}>{comment}</p>
            </div>
            <Switch checked={isBlocked}/>
        </div>
    )
}
export default CommentCard
