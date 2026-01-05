import { FileText, Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import CustomPagination from "@/components/CustomPagination.tsx";
import { useEffect, useState } from "react";
import CommentCard from "@/components/panels/admin/CommentCard.tsx";
import { getAllCommentsAdmin, toggleCommentStatus } from "@/services/comment.ts";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch.tsx"; // Switch එක ඕන

interface CommentData {
    _id: string;
    content: string;
    isApproved: boolean;
    createdAt: string;
    author: {
        fullname: string;
        username: string;
        profilePictureURL: string;
    };
    blog?: {
        title: string;
    }
}

const CommentsSection = () => {
    const [comments, setComments] = useState<CommentData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 5;
    const [commentsCurrentPage, setCommentsCurrentPage] = useState(1);

    // 1. Fetch Comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                setIsLoading(true);
                const result = await getAllCommentsAdmin();
                setComments(result.data);
            } catch (error) {
                toast.error("Failed to load comments");
            } finally {
                setIsLoading(false);
            }
        };
        fetchComments();
    }, []);

    useEffect(() => {
        setCommentsCurrentPage(1);
    }, [searchTerm]);

    const handleStatusToggle = async (commentId: string) => {
        // Optimistic Update
        const updatedComments = comments.map(c =>
            c._id === commentId ? { ...c, isApproved: !c.isApproved } : c
        );
        setComments(updatedComments);

        try {
            await toggleCommentStatus(commentId);
        } catch (error) {
            toast.error("Update failed");
            setComments(comments);
        }
    };

    const filteredComments = comments.filter(comment =>
        comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.author.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const commentsLastIndex = commentsCurrentPage * itemsPerPage;
    const commentsFirstIndex = commentsLastIndex - itemsPerPage;
    const currentComments = filteredComments.slice(commentsFirstIndex, commentsLastIndex);

    if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin w-8 h-8 text-primary"/></div>;

    return (
        <motion.div
            key="comments"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={"flex flex-col gap-6"}
        >
            <div>
                <div className={"flex flex-col md:flex-row items-center justify-between gap-5"}>
                    <p className={"leading-none font-semibold whitespace-nowrap"}>Comments Moderation</p>
                    {comments.length !== 0 && (
                        <div className={"w-full flex flex-col sm:flex-row gap-4"}>
                            <div className={"relative flex-1"}>
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium">
                                    <Search strokeWidth={2} size={16} />
                                </div>
                                <input
                                    placeholder={"Search comments..."}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 transition-all shadow-xs"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {filteredComments.length !== 0 ? (
                <>
                    <div className={"space-y-4"}>
                        {currentComments.map((comment, index) => (
                            <motion.div
                                key={comment._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: comment.isApproved ? 1 : 0.5, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                <CommentCard
                                    userImgSrc={comment.author.profilePictureURL}
                                    userName={comment.author.fullname}
                                    date={new Date(comment.createdAt).toLocaleDateString()}
                                    comment={comment.content}

                                />

                                <div className="absolute top-4 right-4 flex items-center">
                                    <Switch
                                        checked={comment.isApproved}
                                        onCheckedChange={() => handleStatusToggle(comment._id)}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredComments.length > itemsPerPage && (
                        <div className="flex justify-center">
                            <CustomPagination
                                totalItems={filteredComments.length}
                                itemsPerPage={itemsPerPage}
                                currentPage={commentsCurrentPage}
                                onPageChange={setCommentsCurrentPage}
                            />
                        </div>
                    )}
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={"flex flex-col items-center p-12 text-neutral-strong dark:text-neutral-medium gap-3"}>
                    <FileText className={"w-12 h-12 "} />
                    <p>No comments found</p>
                </motion.div>
            )}
        </motion.div>
    )
}
export default CommentsSection;