import { useState } from "react";
import {ChevronUp, Loader2, Send} from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {addComment, type CommentType} from "@/services/comment.ts";
import {toast} from "sonner";

interface CommentItemProps {
    comment: CommentType;
    currentUserId?: string;
    postAuthorId?: string;
    onReplyAdded: () => void;
}

const accordionVariants: Variants = {
    hidden: {
        opacity: 0,
        height: 0,
        overflow: "hidden",
        transition: { height: { duration: 0.3, ease: "easeInOut" }, opacity: { duration: 0.2 } }
    },
    visible: {
        opacity: 1,
        height: "auto",
        overflow: "visible",
        transition: { height: { duration: 0.3, ease: "easeInOut" }, opacity: { duration: 0.3, delay: 0.1 } }
    }
};

const replyFormVariants: Variants = {
    hidden: {
        opacity: 0,
        height: 0,
        overflow: "hidden",
        marginTop: 0,
        marginBottom: 0,
        transition: { duration: 0.2, ease: "easeInOut" }
    },
    visible: {
        opacity: 1,
        height: "auto",
        overflow: "visible",
        marginTop: 16,
        marginBottom: 8,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

const CommentItem = ({ comment, currentUserId, postAuthorId, onReplyAdded }: CommentItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const hasReplies = comment.replies && comment.replies.length > 0;


    const isYou = currentUserId === comment.author._id;
    const isAuthor = postAuthorId === comment.author._id;

    const handleReplySubmit = async () => {
        if (!replyText.trim()) return;

        setIsSubmitting(true);
        try {
            await addComment({
                content: replyText,
                blogId: comment.blog,
                parentCommentId: comment._id
            });
            toast.success("Reply added!");
            setReplyText("");
            setIsReplying(false);
            setIsOpen(true);
            onReplyAdded();
        } catch (error) {
            toast.error("Failed to add reply");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="flex flex-col mb-4 theme-transition">
            <div className="flex gap-3 items-start">
                <div
                    style={{ backgroundImage: `url("${comment.author.profilePictureURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + comment.author.username}")` }}
                    className="w-8 h-8 rounded-full bg-center bg-cover bg-no-repeat shrink-0 mt-1"
                ></div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-sm text-dark-secondary dark:text-light-secondary">
                            {comment.author.fullname}
                        </span>

                        {isYou && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 font-medium border border-neutral-300 dark:border-neutral-600">
                                You
                            </span>
                        )}

                        {!isYou && isAuthor && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 font-medium border border-indigo-200 dark:border-indigo-800">
                                Author
                            </span>
                        )}

                        <span className="text-xs text-neutral-strong/70 dark:text-neutral-medium">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <p className="text-sm text-neutral-800 dark:text-neutral-300 mb-2">
                        {comment.content}
                    </p>

                    <div className="flex items-center gap-4">
                        {currentUserId && (
                            <button
                                onClick={() => setIsReplying(!isReplying)}
                                className={`text-xs font-medium transition-colors cursor-pointer ${
                                    isReplying ? "text-indigo-500" : "text-neutral-strong dark:text-neutral-medium hover:text-indigo-500"
                                }`}
                            >
                                Reply
                            </button>
                        )}

                        {hasReplies && (
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-xs font-medium text-neutral-500 hover:text-indigo-500 flex items-center gap-1 cursor-pointer transition-colors"
                            >
                                {isOpen ? (
                                    <><ChevronUp className="w-3 h-3" /> Hide replies</>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-1">
                                            <div className="w-6 h-[1px] bg-neutral-300 dark:bg-neutral-700"></div>
                                            <span>View {comment.replies!.length} replies</span>
                                        </div>
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    <AnimatePresence>
                        {isReplying && (
                            <motion.div
                                variants={replyFormVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    rows={3}
                                    placeholder={`Replying to ${comment.author.fullname}...`}
                                    autoFocus
                                    className="
                                        w-full
                                        text-sm
                                        font-light
                                        border dark-border py-2 px-3 rounded-md
                                        border-neutral-strong/20
                                        bg-transparent
                                        text-dark-secondary dark:text-light-secondary
                                        placeholder:text-neutral-strong/50
                                        dark:placeholder:text-neutral-medium/50
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-indigo-500/20
                                        focus:border-indigo-500
                                        transition-all duration-300 ease-in-out
                                        shadow-sm
                                        tracking-wide
                                        resize-none
                                    "
                                />
                                <div className="flex items-center justify-end gap-2 mt-2">
                                    <button
                                        onClick={() => setIsReplying(false)}
                                        className="text-xs font-medium text-neutral-500 hover:text-red-500 px-3 py-1.5 rounded-md transition-colors"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleReplySubmit}
                                        disabled={isSubmitting}
                                        className="text-xs font-medium bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-1"
                                    >
                                        {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin"/> : <Send className="w-3 h-3" />}
                                        Reply
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && hasReplies && (
                    <motion.div
                        variants={accordionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="ml-3 pl-3 md:ml-6 md:pl-6 border-l-2 border-neutral-200 dark:border-neutral-700/50"
                    >
                        <div className="py-2">
                            {comment.replies!.map((reply) => (
                                <CommentItem
                                    key={reply._id}
                                    comment={reply}
                                    currentUserId={currentUserId}
                                    postAuthorId={postAuthorId}
                                    onReplyAdded={onReplyAdded}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CommentItem;