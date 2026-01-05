import {Eye, FileText, Search, Loader2} from "lucide-react";
import CustomSelect from "@/components/CustomSelection.tsx";
import {motion} from "framer-motion";
import {cn} from "@/utils/cnUtil.ts";
import {Switch} from "@/components/ui/switch.tsx";
import {Link} from "react-router-dom";
import CustomPagination from "@/components/CustomPagination.tsx";
import {useEffect, useState} from "react";
import {ChartLineLabel} from "@/components/ui/ChartLineLabel.tsx";
import {ChartRadarGridCircleFill} from "@/components/ui/ChartRadarGridCircleFill.tsx";
import {getAllPostsAdmin, togglePostStatus} from "@/services/blog.ts";
import {toast} from "sonner";

interface PostData {
    _id: string;
    title: string;
    status: string;
    isFeatured: boolean;
    views: number;
    likes: number;
    author: {
        fullname: string;
        username: string;
    };
}

const PostsSection = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 5;
    const [postsCurrentPage, setPostsCurrentPage] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const result = await getAllPostsAdmin();
                setPosts(result.data);
            } catch (error) {
                toast.error("Failed to load posts");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        setPostsCurrentPage(1);
    }, [searchTerm]);

    const handleToggle = async (id: string, type: 'featured' | 'blocked') => {
        const originalPosts = [...posts];

        const updatedPosts = posts.map(post => {
            if (post._id === id) {
                if (type === 'featured') {
                    return { ...post, isFeatured: !post.isFeatured };
                } else if (type === 'blocked') {
                    const newStatus = post.status === 'BLOCKED' ? 'PUBLISHED' : 'BLOCKED';
                    return { ...post, status: newStatus, isFeatured: newStatus === 'BLOCKED' ? false : post.isFeatured };
                }
            }
            return post;
        });
        setPosts(updatedPosts);

        try {
            await togglePostStatus(id, type);
            toast.success(`Post ${type === 'featured' ? 'featured status' : 'block status'} updated`);
        } catch (error) {
            toast.error("Update failed");
            setPosts(originalPosts);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const postsLastIndex = postsCurrentPage * itemsPerPage;
    const postsFirstIndex = postsLastIndex - itemsPerPage;
    const currentPosts = filteredPosts.slice(postsFirstIndex, postsLastIndex);

    if (isLoading) {
        return <div className="flex justify-center p-10"><Loader2 className="animate-spin w-8 h-8 text-primary"/></div>;
    }

    return (
        <div className="flex flex-col gap-8">
            <motion.div
                key="posts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 px-6 shadow-sm"}
            >
                <div>
                    <div className={"flex flex-col md:flex-row items-center justify-between gap-5"}>
                        <p className={"leading-none font-semibold whitespace-nowrap"}>All Posts</p>
                        {posts.length != 0 && (
                            <div className={"flex flex-col sm:flex-row gap-4 w-full md:w-auto"}>
                                <div className={"relative w-full md:w-72"}>
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium">
                                        <Search strokeWidth={2} size={16} />
                                    </div>
                                    <input
                                        placeholder={"Search Posts..."}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
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
                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                    <CustomSelect
                                        placeholder={"All"}
                                        options={["All", "Featured", "Popular", "Recent", "Published", "Drafts"]}
                                        onChange={(val) => console.log(val)}
                                        className={"shrink-0 w-full sm:w-auto"}
                                    />
                                    <CustomSelect
                                        placeholder={"All"}
                                        options={["All", "Active", "Inactive"]}
                                        onChange={(val) => console.log(val)}
                                        className={"shrink-0 w-full sm:w-auto"}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {filteredPosts.length != 0 ? (
                    <>
                        <div className={"relative w-full overflow-x-auto"}>
                            <table className={"w-full caption-bottom text-sm"}>
                                <thead className={"[&_tr]:border-b"}>
                                <tr className={"hover:bg-muted/50 border-b transition-colors"}>
                                    <th className={"h-10 px-2 text-left align-middle font-medium whitespace-nowrap"}>
                                        Title
                                    </th>
                                    <th className={"h-10 px-2 text-left align-middle font-medium whitespace-nowrap"}>
                                        Author
                                    </th>
                                    <th className={"h-10 px-2 text-left align-middle font-medium whitespace-nowrap"}>
                                        Status
                                    </th>
                                    <th className={"h-10 px-2 text-left align-middle font-medium whitespace-nowrap"}>
                                        Featured
                                    </th>
                                    <th className={"h-10 px-2 text-left align-middle font-medium whitespace-nowrap"}>
                                        Blocked
                                    </th>
                                    <th className={"h-10 px-2 text-left align-middle font-medium whitespace-nowrap"}>
                                        Views
                                    </th>
                                    <th className={"h-10 px-2 text-left align-middle font-medium whitespace-nowrap"}>
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className={"[&_tr:last-child]:border-0"}>
                                {currentPosts.map((post) => (
                                    <motion.tr
                                        key={post._id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={"hover:bg-muted/50 border-b transition-colors"}
                                    >
                                        <td className={"p-2 align-middle whitespace-nowrap max-w-[200px] truncate"}>
                                            {post.title}
                                        </td>

                                        <td className={"p-2 align-middle whitespace-nowrap"}>
                                            <div className="text-sm">{post.author?.fullname}</div>
                                            <div className="text-xs text-muted-foreground">@{post.author?.username}</div>
                                        </td>

                                        <td className={"p-2 align-middle whitespace-nowrap"}>
                                         <span
                                             className={cn(
                                                 "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 overflow-hidden",
                                                 {
                                                     "bg-primary/10 text-primary": post.status === "PUBLISHED",
                                                     "bg-secondary/10 text-secondary-foreground": post.status === "DRAFT",
                                                     "bg-red-500/10 text-red-500": post.status === "BLOCKED",
                                                 }
                                             )}
                                         >
                                             {post.status}
                                         </span>
                                        </td>

                                        <td className={"p-2 align-middle whitespace-nowrap"}>
                                            <Switch
                                                checked={post.isFeatured}
                                                onCheckedChange={() => handleToggle(post._id, 'featured')}
                                                disabled={post.status !== 'PUBLISHED'} // Only published posts can be featured
                                            />
                                        </td>
                                        <td className={"p-2 align-middle whitespace-nowrap"}>
                                            <Switch
                                                checked={post.status === 'BLOCKED'}
                                                onCheckedChange={() => handleToggle(post._id, 'blocked')}
                                            />
                                        </td>

                                        <td className={"p-2 align-middle whitespace-nowrap"}>
                                        <span className={"flex items-center gap-1"}>
                                            <Eye className={"w-4 h-4"}/>
                                            {post.views}
                                        </span>
                                        </td>

                                        <td className={"p-2 align-middle whitespace-nowrap"}>
                                            <Link
                                                to={`/blogs/${post._id}`} // Assuming detailed view uses slug or ID
                                                className={
                                                    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all " +
                                                    " hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3"
                                                }
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>

                        </div>
                        <div className="flex justify-center mt-4">
                            <CustomPagination
                                totalItems={filteredPosts.length}
                                itemsPerPage={itemsPerPage}
                                currentPage={postsCurrentPage}
                                onPageChange={setPostsCurrentPage}
                            />
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={"flex flex-col items-center p-12 text-neutral-strong dark:text-neutral-medium gap-3"}
                    >
                        <FileText className={"w-12 h-12 "} />
                        <p>No posts found.</p>
                    </motion.div>
                )}

            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={"flex flex-col sm:flex-row gap-6 w-full"}
            >
                <div className={"flex-1"}>
                    <ChartLineLabel/>
                </div>
                <div className={"flex-1"}>
                    <ChartRadarGridCircleFill/>
                </div>
            </motion.div>
        </div>
    )
}
export default PostsSection;