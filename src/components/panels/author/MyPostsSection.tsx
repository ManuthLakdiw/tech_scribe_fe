import {FileText, Plus, Search} from "lucide-react";
import CustomSelect from "@/components/CustomSelection.tsx";
import {motion} from "framer-motion";
import BlogDescription from "@/components/panels/author/BlogDescription.tsx";
import CustomPagination from "@/components/CustomPagination.tsx";
import {useEffect, useState} from "react";
import {deleteBlog, getPublishedBlogs} from "@/services/blog.ts";
import {calculateReadingTime} from "@/utils/readingTimeUtil.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

interface MyPostsSectionProps {
    setIsShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedPost: React.Dispatch<React.SetStateAction<BlogPost | null>>;
    postTrigger: number;
    onRefresh: () => void;
}

export interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    category: string;
    isFeatured: boolean;
    views: number;
    likes: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    author: {
        fullname: string;
        profilePictureURL: string;
        _id: string;
        role: string;
        username: string;
    }

}

const formatDate = (dateString: string): string => {
    if (!dateString) return "";

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');

    const month = String(date.getMonth() + 1).padStart(2, '0');

    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};


const MyPostsSection = ({setIsShowPopUp, setSelectedPost, postTrigger, onRefresh}:MyPostsSectionProps) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const navigate = useNavigate();

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            await deleteBlog(id); // API call
            toast.success("Post deleted successfully");
            onRefresh();
        } catch (error: any) {
            console.log(error);
            toast.error("Failed to delete post");
        }
    };


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await getPublishedBlogs();
                setPosts(result.data);
                console.log(result);
            } catch (error) {
                console.log("Error fetching posts", error);
            }
        };

        fetchPosts();

    }, [postTrigger]);

    const itemsPerPage = 3;
    const [postsCurrentPage, setPostsCurrentPage] = useState(1);
    const postsLastIndex = postsCurrentPage * itemsPerPage;
    const postsFirstIndex = postsLastIndex - itemsPerPage;
    const currentPosts = posts.slice(postsFirstIndex, postsLastIndex);

    return (
        <motion.div
            key="posts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={"flex flex-col gap-6"}
        >
            <div>
                <div className={"flex flex-col md:flex-row items-center justify-between gap-5"}>
                    <p className={"leading-none font-semibold whitespace-nowrap"}>Your Posts</p>
                    {posts.length != 0 && (
                        <div className={"w-full flex flex-col sm:flex-row gap-4"}>
                            <div className={"relative flex-1"}>
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium">
                                    <Search strokeWidth={2} size={16} />
                                </div>
                                <input
                                    placeholder={"Search Posts"}
                                    className="
                                                                w-full
                                                                text-sm
                                                                font-light
                                                                border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg
                                                                border-neutral-strong/20
                                                                bg-light-secondary dark:bg-overlay-light
                                                                text-dark-secondary dark:text-light-secondary
                                                                placeholder:text-neutral-strong
                                                                placeholder-dark:text-neutral-medium
                                                                dark:placeholder:text-neutral-medium
                                                                focus:outline-1
                                                                focus:outline-neutral-strong/50
                                                                focus:ring-3
                                                                focus:ring-neutral-strong/30
                                                                dark:focus:ring-neutral-strong/60
                                                                focus:ring-offset-0
                                                                transition-all duration-300 ease-in-out
                                                                shadow-xs
                                                            "
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
                    )}
                </div>
            </div>
            {posts.length != 0 ? (
                <>
                    <div className={"space-y-4"}>
                        {currentPosts.map((post, index) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <BlogDescription
                                    title={post.title}
                                    isFeatured={post.isFeatured}
                                    isPublished={post.status === "PUBLISHED"}
                                    views={post.views}
                                    likes={10}
                                    comments={0}
                                    readTime={calculateReadingTime(post.content)}
                                    date={formatDate(post.createdAt)}
                                    onEdit={() => {
                                        setSelectedPost(post);
                                        setIsShowPopUp(true);
                                    }}
                                    onDelete={() => handleDelete(post._id)}
                                    onView={() => navigate(`/blogs/${post.slug}`)}
                                />
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <CustomPagination
                            totalItems={posts.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={postsCurrentPage}
                            onPageChange={setPostsCurrentPage}
                        />
                    </div>
                </>
            ) : (
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}

                    transition={{
                        duration: 1
                    }}
                    className={"flex flex-col items-center p-12 text-neutral-strong dark:text-neutral-medium gap-3"}>
                    <FileText className={"w-12 h-12 "} />
                    <p>No posts yet</p>
                    <button
                        onClick={() => {
                            setSelectedPost(null);
                            setIsShowPopUp(true);
                        }}
                        className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all " +
                            "bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 shadow-xs h-9 px-4 py-2 " +
                            "text-light-secondary dark:text-dark-secondary border border-neutral-soft dark-border"}>
                        <Plus className={"w-4 h-4 sm:mr-2"} />
                        <span className="hidden sm:inline">Create your first post</span>
                    </button>
                </motion.div>
            )}

        </motion.div>
    )
}
export default MyPostsSection
