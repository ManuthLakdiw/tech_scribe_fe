import { motion } from "framer-motion";
import { Search } from "lucide-react";
import CustomSelect from "@/components/CustomSelection.tsx";
import DraftCard from "@/components/DraftCard.tsx";
import CustomPagination from "@/components/CustomPagination.tsx";
import React, { useEffect, useState } from "react";
import {deleteBlog, getDraftBlogs} from "@/services/blog.ts";
import type {BlogPost} from "@/components/panels/author/MyPostsSection.tsx";
import {toast} from "sonner";

interface DraftSectionProps {
    setIsShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedPost: React.Dispatch<React.SetStateAction<BlogPost | null>>;
    postTrigger: number;
    onRefresh: () => void;
}

const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

const calculateCompletion = (post: BlogPost) => {
    let score = 0;
    if (post.title) score += 20;
    if (post.slug) score += 10;
    if (post.category) score += 10;
    if (post.coverImage) score += 20;
    if (post.content && post.content.length > 50) score += 40;
    return score + "%";
};

const DraftSection = ({ setIsShowPopUp, setSelectedPost, postTrigger, onRefresh}: DraftSectionProps) => {

    const [drafts, setDrafts] = useState<BlogPost[]>([]);

    const itemsPerPage = 3;
    const [draftsPage, setDraftsPage] = useState(1);
    const draftsLastIndex = draftsPage * itemsPerPage;
    const draftsFirstIndex = draftsLastIndex - itemsPerPage;
    const currentDrafts = drafts.slice(draftsFirstIndex, draftsLastIndex);

    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const result = await getDraftBlogs();
                setDrafts(result.data);
            } catch (error) {
                console.log("Error fetching drafts");
            }
        };
        fetchDrafts();
    }, [postTrigger]);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this draft?")) return;

        try {
            await deleteBlog(id);
            toast.success("Draft deleted successfully");
            onRefresh();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete draft");
        }
    };


    return (
        <motion.div
            key="drafts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={"flex flex-col gap-6"}
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                <p className="leading-none font-semibold whitespace-nowrap">Your Drafts</p>
                <div className="w-full flex flex-col sm:flex-row gap-4">
                    <div className={"relative flex-1"}>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium">
                            <Search strokeWidth={2} size={16} />
                        </div>
                        <input
                            placeholder={"Search Posts"}
                            className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs"
                        />
                    </div>
                    <div className={"flex gap-4"}>
                        <CustomSelect
                            options={["Newest First", "Oldest First", "Most Popular"]}
                            onChange={(val) => console.log(val)}
                            className={"flex-1 shrink-0"}
                        />
                        <CustomSelect
                            isShowIcon={false}
                            options={["Any Time", "Last 7 Days", "Last 30 Days", "This Year"]}
                            onChange={(val) => console.log(val)}
                            className={"flex-1 shrink-0 min-w-0"}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {currentDrafts.length > 0 ? (
                    currentDrafts.map((draft, index) => (
                        <motion.div
                            key={draft._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <DraftCard
                                title={draft.title || "Untitled Draft"}
                                lastEdited={getTimeAgo(draft.updatedAt || new Date().toString())}
                                completion={calculateCompletion(draft)}
                                onEdit={() => {
                                    setSelectedPost(draft);
                                    setIsShowPopUp(true);
                                }}
                                onDelete={() => handleDelete(draft._id)}
                            ></DraftCard>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-10 text-neutral-strong dark:text-neutral-medium border border-dashed rounded-lg">
                        No drafts found. Start writing a new post!
                    </div>
                )}
            </div>

            {drafts.length > itemsPerPage && (
                <div className="flex justify-center">
                    <CustomPagination
                        totalItems={drafts.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={draftsPage}
                        onPageChange={setDraftsPage}
                    />
                </div>
            )}

        </motion.div>
    )
}
export default DraftSection;