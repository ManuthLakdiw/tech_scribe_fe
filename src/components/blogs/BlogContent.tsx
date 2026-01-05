import {useEffect, useState} from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import {useNavigate, useParams} from "react-router-dom";
import {
    ArrowLeft,
    Bookmark,
    ChevronRight,
    Clock,
    Eye,
    Heart, Linkedin,
    MessageSquare,
    Send,
    Share2,
    Twitter,
    Link, Facebook, Loader2
} from "lucide-react";
import { cn } from "../../utils/cnUtil.ts";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import '../../codeTheme.css'
import CommentItem from "../CommentItem.tsx";
import ResponsiveGrid from "../ResponsiveGrid.tsx";
import RelatedBlogCard from "./RelatedBlogCard.tsx";
import type {BlogPost} from "@/components/panels/author/MyPostsSection.tsx";
import {getBlogBySlug} from "@/services/blog.ts";
import {calculateReadingTime} from "@/utils/readingTimeUtil.ts";
import {useAuth} from "@/hooks/useAuth.ts";
import {addComment, type CommentType, getCommentsByBlog} from "@/services/comment.ts";
import {toast} from "sonner";

const generateId = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

// --- Animation Variants ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const sidebarVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};


const BlogContent = () => {

    const { id } = useParams();
    const { user } = useAuth();

    const [post, setPost] = useState<BlogPost | null>(null);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [commentText, setCommentText] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [headings, setHeadings] = useState<{ level: number; text: string; id: string }[]>([]);

    const [isFixed, setIsFixed] = useState(false);
    const navigate = useNavigate();

    const { scrollY, scrollYProgress } = useScroll();
    const [btnText, setBtnText] = useState("Back to Articles");

    const backBtnY = useSpring(
        useTransform(scrollY, [0, 400], [0, window.innerHeight * 0.5]),
        { stiffness: 100, damping: 30 }
    );

    const backBtnX = useSpring(
        useTransform(scrollY, [0, 400], [0, window.innerWidth * 0.86]),
        { stiffness: 100, damping: 30 }
    );

    const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0vw", "100vw"]);

    const backBtnScale = useTransform(scrollY, [0, 200, 400], [1, 0.9, 0.8]);
    const backBtnOpacity = useTransform(scrollY, [0, 50], [1, 0.95]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest >= 5) {
            setBtnText("");
            setIsFixed(true);
        }
        else {
            setBtnText("Back to Articles");
            setIsFixed(false);
        }
    });


    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const result = await getBlogBySlug(id);
                setPost(result.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load blog post.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    useEffect(() => {
        if (!post?.content) return;


        const regex = /^(#{1,6})\s+(.+)$/gm;
        const extractedHeadings = [];
        let match;


        while ((match = regex.exec(post.content)) !== null) {
            extractedHeadings.push({
                level: match[1].length,
                text: match[2].trim(),
                id: generateId(match[2].trim())
            });
        }

        setHeadings(extractedHeadings);

    }, [post]);

    useEffect(() => {
        const fetchComments = async () => {
            if (!post?._id) return;
            try {
                const result = await getCommentsByBlog(post._id);
                setComments(result.data);
            } catch (err) {
                console.error("Failed to load comments");
            }
        };
        fetchComments();
    }, [post?._id, refreshTrigger]);

    const handleCommentSubmit = async () => {
        if (!commentText.trim() || !post?._id) return;
        if (!user) return alert("Please login");
        try {
            await addComment({
                content: commentText,
                blogId: post._id,
                parentCommentId: null
            });
            setCommentText("");
            setRefreshTrigger(prev => prev + 1);
            toast.success("Comment added!");
        } catch (error) {
            toast.error("Error");
        }
    };


    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="flex h-screen items-center justify-center text-red-500">
                {error || "Blog post not found"}
            </div>
        );
    }

    const formatLongDate = (dateString: string): string => {
        if (!dateString) return "";

        const date = new Date(dateString);

        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };


    return (

        <section className={"w-full min-h-screen px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary relative theme-transition"}>
            <motion.div
                style={{
                    width: progressBarWidth
                }}
                className={"w-50 h-1 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end fixed top-0 left-0 z-100"}>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 pt-15 lg:pt-6 mb-12 relative">

                <article className={"w-full min-h-screen"}>
                    <motion.button
                        style={{
                            y: backBtnY,
                            x: backBtnX,
                            scale: backBtnScale,
                            opacity: backBtnOpacity,
                        }}
                        onClick={() => navigate("/blogs")}
                        className={cn(
                            "fixed z-50 mb-8 flex items-center gap-2 cursor-pointer",
                            "text-sm font-medium transition-colors duration-300 ease-in-out active:scale-95",

                            !isFixed && "px-4 py-2 rounded-md text-dark-secondary dark:text-light-secondary hover:bg-dark-secondary/5 dark:hover:bg-overlay-light",

                            isFixed && "p-4 rounded-full shadow-xl bg-dark-secondary dark:bg-light-secondary text-light-secondary dark:text-dark-secondary hover:bg-neutral-800 dark:hover:bg-neutral-200"
                        )}
                    >
                        <ArrowLeft className={"w-4 h-4"} strokeWidth={isFixed ? 3 : 2} />
                        {btnText}
                    </motion.button>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className={"mt-16"}>

                        <motion.div
                            variants={itemVariants}
                            className={"mb-4"}>
                           <span className={"inline-flex items-center justify-center rounded-md px-2 py-1 text-xs " +
                               "text-dark-secondary dark:text-light-secondary bg-dark-secondary/5 dark:bg-overlay-light" +
                               " font-medium w-fit whitespace-nowrap"}
                           >
                               {post.category}
                           </span>
                            <span className={"text-sm text-neutral-strong dark:text-neutral-medium ml-3"}>{formatLongDate(post.createdAt)}</span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className={"text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-dark-secondary dark:text-light-secondary"}>
                            {post.title}
                        </motion.h1>

                        <motion.div
                            variants={itemVariants}
                            className={"flex flex-wrap items-center gap-x-6 gap-y-4 mb-8"}>
                            <div className={"group flex items-center gap-3 cursor-pointer hover:opacity-80"}>
                                <div
                                    className={"w-[32px] h-[32px] rounded-full bg-center bg-cover bg-no-repeat shrink-0"}
                                    style={{backgroundImage: `url(${post.author.profilePictureURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"})`}}
                                ></div>
                                <div>
                                    <p className={"font-semibold text-dark-secondary dark:text-light-secondary"}>{post.author.fullname}</p>
                                    <p className={"text-sm text-neutral-strong dark:text-neutral-medium group-hover:underline transition-all duration-300 ease-in-out"}>@{post.author.username}</p>
                                </div>
                            </div>
                            <div>
                                <div className={"flex items-center gap-4"}>
                                    <div className={"flex items-center gap-1"}>
                                        <Clock strokeWidth={2} className={"w-4 h-4 text-neutral-600 dark:text-neutral-strong"} />
                                        <p className={"text-sm text-neutral-strong dark:text-neutral-medium"}>{calculateReadingTime(post.content)}</p>
                                    </div>
                                    <div className={"flex items-center gap-1"}>
                                        <Eye strokeWidth={2} className={"w-4 h-4 text-neutral-600 dark:text-neutral-strong"} />
                                        <p className={"text-sm text-neutral-strong dark:text-neutral-medium"} >{post.views} views</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={imageVariants}
                            style={{ backgroundImage: `url('${post.coverImage}')` }}
                            className={"w-full relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 bg-center bg-cover bg-no-repeat"}>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className={"flex items-center gap-3 md:gap-4 mb-8 pb-8 border-b border-neutral-soft dark-border"}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={"group flex items-center gap-2 px-4 py-2 rounded-full transition-colors bg-dark-secondary/5 hover:bg-dark-secondary/4 cursor-pointer " +
                                    "dark:bg-dark-secondary/60 dark:hover:bg-dark-secondary/50 text-dark-secondary dark:text-light-secondary duration-300 ease-in-out"}>
                                <Heart className={"w-5 h-5 group-hover:text-red-500 group-hover:scale-105 transition-colors duration-300 ease-in-out"} />
                                0
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={"group flex items-center gap-2 px-4 py-2 rounded-full transition-colors bg-dark-secondary/5 hover:bg-dark-secondary/4 cursor-pointer " +
                                    "dark:bg-dark-secondary/60 dark:hover:bg-dark-secondary/50 text-dark-secondary dark:text-light-secondary duration-300 ease-in-out"}>
                                <Bookmark className={"w-5 h-5 group-hover:text-yellow-500 group-hover:scale-105 transition-colors duration-300 ease-in-out"} />
                                Save
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={"group flex items-center gap-2 px-4 py-2 rounded-full transition-colors bg-dark-secondary/5 hover:bg-dark-secondary/3 cursor-pointer " +
                                    "dark:bg-dark-secondary/60 dark:hover:bg-dark-secondary/50 text-dark-secondary dark:text-light-secondary duration-300 ease-in-out"}>
                                <Share2 className={"w-5 h-5 group-hover:text-blue-500 group-hover:scale-105 transition-colors duration-300 ease-in-out"} />
                                Share
                            </motion.button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                            className={"max-w-none mb-12"}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                                components={{
                                    h1: ({node, children, ...props}) => {
                                        const id = generateId(String(children));
                                        return <h1 id={id} className=" scroll-mt-24 text-3xl font-bold mt-12 mb-6 text-dark-secondary dark:text-light-secondary tracking-tight" {...props}>{children}</h1>
                                    },
                                    h2: ({node, children, ...props}) => {
                                        const id = generateId(String(children));
                                        return <h2 id={id} className=" scroll-mt-24 text-2xl font-bold mt-10 mb-4 text-dark-secondary dark:text-light-secondary tracking-tight" {...props}>{children}</h2>
                                    },
                                    h3: ({node, children, ...props}) => {
                                        const id = generateId(String(children));
                                        return <h3 id={id} className="scroll-mt-24 text-xl md:text-2xl font-semibold mt-8 mb-3 text-dark-secondary dark:text-light-secondary" {...props}>{children}</h3>
                                    },
                                    p: ({node: _node, ...props}) => (
                                        <p className="mb-4 text-base md:text-lg leading-8 text-neutral-700 dark:text-neutral-300 font-light" {...props} />
                                    ),
                                    a: ({node: _node, ...props}) => (
                                        <a className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline underline-offset-2 transition-colors" {...props} />
                                    ),
                                    code: ({node: _node, inline, className, children, ...props}: any) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const isInline = inline || !match;
                                        return isInline ? (
                                            <code className="px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-mono border border-indigo-100 dark:border-indigo-800 break-words" {...props}>
                                                {children}
                                            </code>
                                        ) : (
                                            <code className={`${className} block text-sm font-mono`} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                    ul: ({node: _node, ...props}) => (
                                        <ul className="list-disc list-outside mb-6 ml-6 text-neutral-700 dark:text-neutral-300 space-y-2 marker:text-indigo-500" {...props} />
                                    ),
                                    ol: ({node: _node, ...props}) => (
                                        <ol className="list-decimal list-outside mb-6 ml-6 text-neutral-700 dark:text-neutral-300 space-y-2 marker:text-indigo-500 font-medium" {...props} />
                                    ),
                                    blockquote: ({node: _node, ...props}) => (
                                        <blockquote className="border-l-4 border-indigo-500 bg-light-secondary dark:bg-gray-800/50 pl-6 py-4 italic my-8 text-neutral-700 dark:text-neutral-300 rounded-r-lg shadow-sm" {...props} />
                                    ),
                                    img: ({node: _node, ...props}) => (
                                        <img className="w-full h-auto rounded-xl my-8 border border-neutral-200 dark:border-neutral-700 shadow-md" {...props} alt={props.alt || "Blog Image"} />
                                    ),
                                    strong: ({node: _node, ...props}) => (
                                        <strong className="font-bold text-dark-primary dark:text-light-primary" {...props} />
                                    ),
                                    hr: ({node: _node, ...props}) => (
                                        <hr className="my-10 border-t border-neutral-200 dark-border" {...props} />
                                    ),
                                    table: ({node: _node, ...props}) => (
                                        <div className="overflow-x-auto my-8 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
                                            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700" {...props} />
                                        </div>
                                    ),
                                    thead: ({node: _node, ...props}) => (
                                        <thead className="bg-gray-50 dark:bg-gray-800" {...props} />
                                    ),
                                    th: ({node: _node, ...props}) => (
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider" {...props} />
                                    ),
                                    td: ({node: _node, ...props}) => (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-700" {...props} />
                                    ),
                                }}
                            >
                                {post.content || "No content found."}
                            </ReactMarkdown>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={"w-full rounded-xl overflow-hidden bg-light-secondary dark:bg-dark-secondary " +
                                "border border-neutral-soft dark-border shadow-sm py-12 px-6 flex flex-col md:flex-row gap-4 items-start mb-12"}
                        >
                            <div
                                style={{backgroundImage: `url(${post.author.profilePictureURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"})`}}
                                className={"w-16 h-16 rounded-full bg-center bg-cover bg-no-repeat shrink-0 mx-auto md:mx-0"}>
                            </div>
                            <div className={"w-full"}>
                                <h3 className={"font-bold text-lg mb-1 text-dark-secondary dark:text-light-secondary text-center md:text-start"}>Written by {post.author.fullname}</h3>
                                <p className={"text-sm md:text-base text-neutral-strong dark:text-neutral-medium font-light mb-3 text-center md:text-start"}>Platform administrator and tech enthusiast</p>
                                <div className="flex justify-center md:justify-start">
                                    <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 border border-neutral-soft " +
                                        "dark-border text-dark-secondary dark:text-light-secondary bg-light-secondary dark:bg-overlay-light hover:bg-neutral-soft/15 dark:hover:bg-white/8 cursor-pointer " +
                                        "transition-all duration-300 ease-in-out"}>
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                        <div className={"mb-12"}>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={"text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2 text-dark-secondary dark:text-light-secondary"}>
                                <MessageSquare className={"w-6 h-6"} />
                                Comments (2)
                            </motion.h2>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={"bg-light-secondary dark:bg-dark-secondary rounded-xl border " +
                                    "py-6 md:py-10 px-4 shadow-sm mb-6 border border-neutral-soft dark-border"}>
                                <div className={"flex gap-3 items-start"}>
                                    <div
                                        style={{backgroundImage: `url(${post.author.profilePictureURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"})`}}
                                        className={"overflow-hidden rounded-full w-8 h-8 md:w-10 md:h-10 bg-center bg-cover bg-no-repeat shrink-0"}>
                                    </div>
                                    <div className={"flex flex-col items-end flex-1"}>
                                        <textarea
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            rows={3}
                                            placeholder={"Write your comment here..."}
                                            className="
                                                w-full
                                                text-sm
                                                font-light
                                                border dark-border py-2 px-3 rounded-md
                                                border-neutral-200 dark:border-neutral-700
                                                bg-transparent
                                                text-dark-secondary dark:text-light-secondary
                                                placeholder:text-neutral-400
                                                dark:placeholder:text-neutral-500
                                                focus:outline-none
                                                focus:border-indigo-500
                                                dark:focus:border-indigo-400
                                                focus:ring-4
                                                focus:ring-indigo-500/10
                                                dark:focus:ring-indigo-400/20
                                                transition-all duration-300 ease-in-out
                                                shadow-sm
                                                tracking-wide
                                                resize-none
                                            "
                                        />
                                        <button
                                            onClick={handleCommentSubmit}
                                            className={"inline-flex items-center justify-center gap-1 " +

                                            "whitespace-nowrap rounded-md text-sm font-medium transition-all px-4 py-2 shadow-sm " +

                                            "text-white bg-indigo-600 hover:bg-indigo-700 " +

                                            "dark:bg-indigo-600 dark:hover:bg-indigo-500 " +

                                            "cursor-pointer w-full sm:w-fit active:scale-95 mt-2 " +

                                            "transition-all duration-300 ease-in-out"}>
                                            <Send className={"w-3.5 h-3.5 mr-1"} />
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                            <div className="space-y-6 mt-8">
                                {comments.map((comment) => (
                                    <CommentItem
                                        key={comment._id}
                                        comment={comment}
                                        currentUserId={user?._id}
                                        postAuthorId={post?.author._id}

                                        onReplyAdded={() => setRefreshTrigger(prev => prev + 1)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className={"text-2xl font-bold mb-6 text-dark-secondary dark:text-light-secondary"}>
                                Related Articles
                            </h2>
                            <div>
                                <ResponsiveGrid defCols={1} smCols={3}>
                                    {Array.from({length: 3}).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1, duration: 0.5 }}
                                        >
                                            <RelatedBlogCard
                                                imgSrc={"https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                                blogTitle={"Mastering Async/Await in Modern JavaScript"}
                                            />
                                        </motion.div>
                                    ))}
                                </ResponsiveGrid>
                            </div>
                        </div>
                    </motion.div>
                </article>
                <aside className={"hidden lg:block h-full"}>
                    <div className={"sticky top-24"}>
                        <motion.div
                            variants={sidebarVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={"bg-light-secondary dark:bg-dark-secondary flex flex-col gap-6 rounded-xl border border-neutral-soft dark-border py-6 shadow-sm mb-6"}>
                            <div className={"p-4"}>
                                <h3 className={"font-semibold mb-4 text-dark-secondary dark:text-light-secondary"}>
                                    Table of Contents
                                </h3>

                                {headings.length > 0 ? (
                                    <nav className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto pr-2">
                                        {headings.map((heading, index) => (
                                            <button
                                                key={index}
                                                onClick={() => scrollToHeading(heading.id)}
                                                className={cn(
                                                    "text-left text-sm py-1 rounded-md transition-colors duration-200 flex items-center gap-2 group",
                                                    "text-neutral-strong dark:text-neutral-medium hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer",
                                                    heading.level === 3 && "pl-4"
                                                )}
                                            >
                                                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-300 group-hover:text-indigo-500 transition-colors shrink-0" />
                                                <span className="truncate">
                                                    {heading.text}
                                                </span>
                                            </button>
                                        ))}
                                    </nav>
                                ) : (
                                    <p className="text-sm text-neutral-500 italic">No headings found.</p>
                                )}
                            </div>
                        </motion.div>

                        <motion.div
                            variants={sidebarVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className={"bg-light-secondary dark:bg-dark-secondary rounded-xl border border-neutral-soft dark-border py-6 shadow-sm mb-6"}>
                            <div className={"p-4 flex flex-col items-center"}>
                                <div
                                    style={{backgroundImage: `url("https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah")`}}
                                    className={"w-16 h-16 rounded-full bg-center bg-cover bg-no-repeat shrink-0 mb-3"}>
                                </div>
                                <div className={"w-full"}>
                                    <h3 className={"font-semibold mb-1 text-dark-secondary dark:text-light-secondary text-center"}>{post.author.fullname}</h3>
                                    <p className={"text-sm text-neutral-strong dark:text-neutral-medium font-light mb-3 text-center line-clamp-2"}>Platform administrator and tech enthusiast</p>
                                    <div className="flex">
                                        <button className={"w-full flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 border border-neutral-soft " +
                                            "dark-border text-dark-secondary dark:text-light-secondary bg-light-secondary dark:bg-overlay-light hover:bg-neutral-soft/15 dark:hover:bg-white/8 cursor-pointer " +
                                            "transition-all duration-300 ease-in-out"}>
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={sidebarVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className={"bg-light-secondary dark:bg-dark-secondary rounded-xl " +
                                "border border-neutral-soft dark-border py-6 shadow-sm flex flex-col gap-6"}
                        >
                            <div className={"p-4"}>
                                <h3 className={"font-semibold mb-3 text-dark-secondary dark:text-light-secondary"}>
                                    Share this article
                                </h3>
                                <div className={"flex gap-2"}>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={"p-[0.7rem] bg-dark-secondary/5 hover:bg-dark-secondary/3 dark:bg-overlay-light dark:hover:bg-overlay-light/80 rounded-full text-dark-secondary" +
                                        " dark:text-light-secondary cursor-pointer" +
                                        " transition-all duration-150 flex items-center justify-center"}
                                    >
                                        <Twitter size={16} />
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={"p-[0.7rem] bg-dark-secondary/5 hover:bg-dark-secondary/3 dark:bg-overlay-light dark:hover:bg-overlay-light/80 rounded-full text-dark-secondary" +
                                        " dark:text-light-secondary cursor-pointer" +
                                        " transition-all duration-150 flex items-center justify-center"}
                                    >
                                        <Facebook size={16} />
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={"p-[0.7rem] bg-dark-secondary/5 hover:bg-dark-secondary/3 dark:bg-overlay-light dark:hover:bg-overlay-light/80 rounded-full text-dark-secondary" +
                                        " dark:text-light-secondary cursor-pointer" +
                                        " transition-all duration-150 flex items-center justify-center"}
                                    >
                                        <Linkedin size={16} />
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={"p-[0.7rem] bg-dark-secondary/5 hover:bg-dark-secondary/3 dark:bg-overlay-light dark:hover:bg-overlay-light/80 rounded-full text-dark-secondary" +
                                        " dark:text-light-secondary cursor-pointer" +
                                        " transition-all duration-150 flex items-center justify-center"}
                                    >
                                        <Link size={16} />
                                    </motion.div>
                                </div>
                            </div>

                        </motion.div>
                    </div>
                </aside>
            </div>
        </section>
    )
}
export default BlogContent