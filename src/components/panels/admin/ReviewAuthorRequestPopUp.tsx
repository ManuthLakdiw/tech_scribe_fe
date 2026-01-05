import { motion } from "framer-motion";
import {Check, File as GenericFileIcon, FileSpreadsheet, FileText, ImageIcon, X, Loader2} from "lucide-react";
import {useEffect, useState} from "react";
import type {AuthorRequestData} from "@/services/auth.ts";

const getFileDetails = (url: string) => {
    if (!url) return { Icon: GenericFileIcon, color: "text-muted-foreground", label: "No Document" };

    const ext = url.split('.').pop()?.toLowerCase();

    switch (ext) {
        case 'pdf': return { Icon: FileText, color: "text-red-500", label: "PDF Document" };
        case 'jpg': case 'jpeg': case 'png': case 'webp':
            return { Icon: ImageIcon, color: "text-blue-500", label: "Image File" };
        case 'xlsx': case 'xls': case 'csv':
            return { Icon: FileSpreadsheet, color: "text-green-500", label: "Excel Spreadsheet" };
        case 'doc': case 'docx':
            return { Icon: FileText, color: "text-blue-600", label: "Word Document" };
        default: return { Icon: GenericFileIcon, color: "text-primary", label: "File" };
    }
};

interface ReviewAuthorRequestPopUpProps {
    setIsOpen: (isOpen: boolean) => void;
    request: AuthorRequestData;
    onAction: (id: string, status: 'APPROVED' | 'REJECTED') => Promise<void>;
}

const ReviewAuthorRequestPopUp = ({setIsOpen, request, onAction}: ReviewAuthorRequestPopUpProps) => {
    const { Icon, color, label } = getFileDetails(request.documentUrl);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    const handleActionClick = async (status: 'APPROVED' | 'REJECTED') => {
        setIsProcessing(true);
        await onAction(request._id, status);
        setIsProcessing(false);
        setIsOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className={"bg-background fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg max-w-2xl max-h-[90vh] overflow-y-auto"}
            >
                <button type="button" onClick={() => setIsOpen(false)} className="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100">
                    <X className={"w-5 h-5"}/>
                </button>

                <div className={"flex flex-col gap-2 text-center sm:text-left mb-2"}>
                    <h2 className={"text-lg leading-none font-semibold"}>Review Author Request</h2>
                </div>

                <div className={"space-y-6"}>
                    <div className={"flex items-center gap-3 pb-6 border-b"}>
                        <span className={"relative flex size-8 shrink-0 overflow-hidden rounded-full"}>
                            <img src={request.user.profilePictureURL || `https://api.dicebear.com/7.x/initials/svg?seed=${request.user.username}`} alt="avatar" className="object-cover w-full h-full"/>
                        </span>
                        <div>
                            <p className={"font-semibold"}>{request.user.fullname}</p>
                            <p className={"text-sm text-muted-foreground"}>@{request.user.username}</p>
                        </div>
                    </div>

                    <div className={"grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                        <div>
                            <h4 className={"text-sm font-semibold text-muted-foreground mb-1"}>Contact Email</h4>
                            <p className={"text-sm"}>{request.email}</p>
                        </div>
                        <div>
                            <h4 className={"text-sm font-semibold text-muted-foreground mb-1"}>Phone Number</h4>
                            <p className={"text-sm"}>{request.phoneNumber}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className={"text-sm font-semibold text-muted-foreground mb-1"}>Qualifications & Experience</h4>
                        <p className={"text-sm bg-accent p-3 rounded-lg whitespace-pre-wrap"}>{request.qualifications}</p>
                    </div>

                    <div>
                        <h4 className={"text-sm font-semibold text-muted-foreground mb-1"}>Reason for Applying</h4>
                        <p className={"text-sm bg-accent p-3 rounded-lg whitespace-pre-wrap"}>{request.reason}</p>
                    </div>

                    <div>
                        <h4 className={"text-sm font-semibold text-muted-foreground mb-1"}>Portfolio URL</h4>
                        {request.portfolioUrl ? (
                            <a href={request.portfolioUrl} target="_blank" rel="noreferrer" className="text-sm text-indigo-500 hover:underline break-all">
                                {request.portfolioUrl}
                            </a>
                        ) : <p className="text-sm text-muted-foreground">Not provided</p>}
                    </div>

                    <div>
                        <h4 className={"text-sm font-semibold text-muted-foreground mb-1"}>Sample Work</h4>
                        <p className={"text-sm bg-accent p-3 rounded-lg whitespace-pre-wrap"}>{request.sampleWriting || "Not provided"}</p>
                    </div>

                    <div>
                        <h4 className={"text-sm font-semibold text-muted-foreground mb-1"}>Uploaded Document</h4>
                        {request.documentUrl ? (
                            <div className={"bg-accent p-4 rounded-lg flex items-center gap-3"}>
                                <Icon className={`w-8 h-8 ${color}`}/>
                                <div>
                                    <p className={"text-sm font-medium"}>{label}</p>
                                    <a href={request.documentUrl} download target="_blank" rel="noreferrer" className="text-xs text-indigo-500 hover:underline">
                                        Download File
                                    </a>
                                </div>
                            </div>
                        ) : <p className="text-sm text-muted-foreground">No document uploaded</p>}
                    </div>

                    <div className={"flex flex-col sm:flex-row gap-3 justify-center pt-4 border-t"}>
                        <button
                            onClick={() => handleActionClick('REJECTED')}
                            disabled={isProcessing}
                            className={"text-dark-secondary dark:text-light-secondary border border-neutral-soft dark-border bg-light-secondary dark:bg-overlay-light hover:bg-neutral-soft/5 dark:hover:bg-white/8 rounded-md cursor-pointer w-full py-2 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"}
                        >
                            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin"/> : <X className={"w-4 h-4 mr-2"}/>}
                            <p className={"text-sm font-medium tracking-wide"}>Reject</p>
                        </button>
                        <button
                            onClick={() => handleActionClick('APPROVED')}
                            disabled={isProcessing}
                            className={"text-light-secondary dark:text-dark-secondary bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 rounded-md cursor-pointer w-full py-2 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"}
                        >
                            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin"/> : <Check className={"w-4 h-4 mr-2"}/>}
                            <p className={"text-sm font-medium tracking-wide"}>Approve</p>
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
export default ReviewAuthorRequestPopUp;