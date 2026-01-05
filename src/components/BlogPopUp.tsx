import { Clock, Save, Send, Sparkles, X, Eye, Code, HelpCircle, Loader2 } from "lucide-react";
import CustomSelect from "@/components/CustomSelection.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { calculateReadingTime } from "@/utils/readingTimeUtil.ts";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import '../codeTheme.css';
import { toast } from "sonner";
import { createBlog, updateBlog } from "@/services/blog.ts";
import { generateBlogContent } from "@/services/ai.ts";

interface CreatePostPopUpProps {
    setIsOpen: (value: boolean) => void;
    initialData?: any | null;
    onPostSaved: () => void;
}

const generateId = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

const markdownGuide = [
    { syntax: '# Header 1', description: 'Main Title' },
    { syntax: '## Header 2', description: 'Section Title' },
    { syntax: '**Bold**', description: 'Bold Text' },
    { syntax: '*Italic*', description: 'Italic Text' },
    { syntax: '- Item', description: 'Bullet List' },
    { syntax: '1. Item', description: 'Numbered List' },
    { syntax: '> Quote', description: 'Blockquote' },
    { syntax: '`Code`', description: 'Inline Code' },
    { syntax: '```js\ncode\n```', description: 'Code Block' },
    { syntax: '[Link](url)', description: 'Hyperlink' },
];

const BlogPopUp = ({ setIsOpen, initialData, onPostSaved }: CreatePostPopUpProps) => {

    const [activeView, setActiveView] = useState<'preview' | 'markdown'>('preview');
    const [showHelp, setShowHelp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const [postData, setPostData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        coverImage: "",
        category: "",
        content: ""
    });

    useEffect(() => {
        if (initialData) {
            setPostData({
                title: initialData.title || "",
                slug: initialData.slug || "",
                excerpt: initialData.excerpt || "",
                coverImage: initialData.coverImage || initialData.coverImageUrl || "",
                category: initialData.category || "",
                content: initialData.content || ""
            });
        } else {
            setPostData({
                title: "", slug: "", excerpt: "", coverImage: "", category: "", content: ""
            });
        }
    }, [initialData]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPostData(prev => ({ ...prev, [name]: value }));

        if (name === "slug") {
            const formattedSlug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setPostData(prev => ({ ...prev, [name]: formattedSlug }));
        }
    };

    const handleCategoryChange = (value: string) => {
        setPostData(prev => ({ ...prev, category: value }));
    };

    const handleAIGenerate = async () => {
        if (!postData.category) {
            toast.error("Please select a category first to generate content.");
            return;
        }

        setIsGenerating(true);

        try {
            const result = await generateBlogContent(postData.category, postData.title);
            const aiData = result.data;

            setPostData(prev => ({
                ...prev,
                title: aiData.title || prev.title,
                slug: aiData.slug || prev.slug,
                excerpt: aiData.excerpt || prev.excerpt,
                coverImage: aiData.coverImage || prev.coverImage,
                content: aiData.content || prev.content
            }));

            toast.success("Content generated successfully using AI!");

        } catch (error) {
            console.error("AI Error:", error);
            toast.error("Failed to generate content. Try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const processSubmission = async (status: 'DRAFT' | 'PUBLISHED') => {
        setIsLoading(true);
        try {
            const payload = {
                ...postData,
                status: status
            };

            if (initialData) {
                await updateBlog(initialData._id, payload);
                toast.success("Post updated successfully!");
            } else {
                await createBlog(payload);
                toast.success(status === 'DRAFT' ? "Draft saved!" : "Post published!");
            }
            onPostSaved();
            setIsOpen(false);

        } catch (error: any) {
            console.error("Submission Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePublishSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        processSubmission('PUBLISHED');
    };

    const handleSaveDraft = () => {
        if (!postData.title.trim()) {
            toast.error("Title is required to save a draft");
            return;
        }
        processSubmission('DRAFT');
    };

    const getRawContent = () => {
        return `---
title: "${postData.title}"
slug: "${postData.slug}"
category: "${postData.category}"
excerpt: "${postData.excerpt}"
coverImage: "${postData.coverImage}"
---

${postData.content}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-dark-secondary/70 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className={
                    "fixed top-[50%] left-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] " +
                    "rounded-lg border bg-background shadow-lg " +
                    "h-[92vh] flex flex-col p-0 gap-0 overflow-hidden " +
                    "max-w-[90vw] md:max-w-3xl lg:max-w-5xl xl:max-w-7xl"
                }>

                <form id="create-post-form" onSubmit={handlePublishSubmit} className="flex flex-col h-full">

                    <div className={"flex flex-col gap-2 text-center sm:text-left px-8 py-6 border-b bg-accent/30 shrink-0"}>
                        <div className={"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"}>
                            <button type="button" onClick={() => setIsOpen(false)} className={"absolute top-3 right-2 rounded-xs opacity-70 transition-opacity hover:opacity-100"}>
                                <X className={"w-4 h-4"} />
                            </button>
                            <h2 className={"text-2xl font-bold"}>
                                {initialData ? "Update Post" : "Create New Post"}
                            </h2>

                            {!initialData && (
                                <button
                                    type="button"
                                    onClick={handleAIGenerate}
                                    disabled={isGenerating || isLoading}
                                    className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20 hover:border-indigo-500/40 px-6 disabled:opacity-50 disabled:cursor-not-allowed"}
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                            <span>Generating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className={"w-3 h-3"} />
                                            <span>Generate with AI</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className={"flex-1 overflow-hidden grid lg:grid-cols-2 gap-8 p-8"}>

                        <div className={"flex flex-col space-y-6 overflow-y-auto px-4"}>
                            <div className={"space-y-2 flex flex-col"}>
                                <label className={"text-dark-secondary dark:text-light-secondary font-semibold"}>Title <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    name="title"
                                    value={postData.title}
                                    onChange={handleInputChange}
                                    disabled={isLoading || isGenerating}
                                    placeholder={"Enter your post title here..."}
                                    className="w-full text-sm font-light border dark-border py-[0.7rem] px-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs disabled:opacity-50"
                                />
                            </div>
                            <div className={"space-y-2 flex flex-col"}>
                                <label className={"text-dark-secondary dark:text-light-secondary font-semibold"}>URL Slug <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    name="slug"
                                    value={postData.slug}
                                    onChange={handleInputChange}
                                    disabled={isLoading || isGenerating}
                                    placeholder={"post-url-slug"}
                                    className="w-full text-sm font-light border dark-border py-[0.7rem] px-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs disabled:opacity-50"
                                />
                            </div>
                            <div className={"space-y-2 flex flex-col"}>
                                <label className={"text-dark-secondary dark:text-light-secondary font-semibold"}>Excerpt <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    name="excerpt"
                                    value={postData.excerpt}
                                    onChange={handleInputChange}
                                    disabled={isLoading || isGenerating}
                                    placeholder={"Write a brief description of your post..."}
                                    className="w-full text-sm font-light border dark-border py-[0.7rem] px-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs disabled:opacity-50"
                                />
                            </div>
                            <div className={"space-y-2 flex flex-col"}>
                                <label className={"text-dark-secondary dark:text-light-secondary font-semibold"}>Cover Image URL <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    name="coverImage"
                                    value={postData.coverImage}
                                    onChange={handleInputChange}
                                    disabled={isLoading || isGenerating}
                                    placeholder={"https://example.com/cover-image.jpg"}
                                    className="w-full text-sm font-light border dark-border py-[0.7rem] px-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs disabled:opacity-50"
                                />
                            </div>
                            <div className={"space-y-2 flex flex-col"}>
                                <label className={"text-dark-secondary dark:text-light-secondary font-semibold"}>Category <span className="text-red-500">*</span></label>
                                <CustomSelect
                                    required={true}
                                    isShowIcon={false}
                                    options={["Web Development", "Frontend Development", "Backend Development", "DevOps", "Mobile Development", "Data Science", "AI&ML", "System Design", "Database"]}
                                    className2={"py-[0.7rem]"}
                                    className={"w-full"}
                                    onChange={handleCategoryChange}
                                    value={postData.category}
                                />
                            </div>
                            <div className={"space-y-2 flex flex-col"}>
                                <label className={"text-dark-secondary dark:text-light-secondary font-semibold"}>Content (Markdown) <span className="text-red-500">*</span></label>
                                <textarea
                                    required
                                    name="content"
                                    value={postData.content}
                                    onChange={handleInputChange}
                                    disabled={isLoading || isGenerating}
                                    rows={15}
                                    placeholder={"write your content in markdown..."}
                                    className="w-full text-sm font-light border dark-border py-[0.47rem] px-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs font-mono disabled:opacity-50"
                                />
                            </div>
                        </div>
                        <div className={"border rounded-xl bg-accent/20 hidden lg:flex flex-col overflow-hidden relative h-full"}>
                            <div className={"flex items-center justify-between mb-0 pb-4 border-b sticky top-0 left-0 px-6 pt-6 bg-background/95 backdrop-blur z-10"}>
                                <h3 className={"font-semibold text-lg"}>
                                    {activeView === 'preview' ? 'Live Preview' : 'Raw Content'}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center bg-accent/50 rounded-lg p-1 border dark:border-neutral-700">
                                        <button type="button" onClick={() => setActiveView('preview')} className={`p-1.5 rounded-md transition-all ${activeView === 'preview' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`} title="Preview">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button type="button" onClick={() => setActiveView('markdown')} className={`p-1.5 rounded-md transition-all ${activeView === 'markdown' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`} title="Raw Code">
                                            <Code className="w-4 h-4" />
                                        </button>
                                        <div className="w-px h-4 bg-border mx-1"></div>
                                        <button type="button" onClick={() => setShowHelp(!showHelp)} className={`p-1.5 rounded-md transition-all ${showHelp ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-muted-foreground hover:text-foreground'}`} title="Markdown Guide">
                                            <HelpCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className={"flex items-center gap-2 text-sm text-muted-foreground border-l pl-3"}>
                                        <Clock className={"w-4 h-4"} />
                                        <span>{calculateReadingTime(postData.content)}</span>
                                    </span>
                                </div>
                            </div>

                            <AnimatePresence>
                                {showHelp && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-20 right-6 z-20 w-64 bg-background border rounded-lg shadow-xl p-4 text-sm"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-semibold text-muted-foreground">Markdown Guide</h4>
                                            <button type="button" onClick={() => setShowHelp(false)}><X className="w-3 h-3" /></button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            {markdownGuide.map((item, index) => (
                                                <div key={index} className="flex flex-col gap-1 p-2 rounded bg-accent/30">
                                                    <code className="font-mono text-primary bg-background/50 px-1 rounded w-fit">{item.syntax}</code>
                                                    <span className="text-muted-foreground">{item.description}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex-1 overflow-y-auto px-6 pb-6 relative">
                                {activeView === 'preview' ? (
                                    <article className={"prose prose-sm dark:prose-invert break-words max-w-none"}>
                                        {postData.category && (
                                            <div className="mt-8 mb-1">
                                                <span className={"inline-flex items-center justify-center rounded-md px-2 py-1 text-xs text-dark-secondary dark:text-light-secondary bg-dark-secondary/5 dark:bg-overlay-light font-medium w-fit whitespace-nowrap"}>
                                                    {postData.category}
                                                </span>
                                            </div>
                                        )}
                                        <h1 className="text-2xl font-bold mb-2 mt-2 text-gray-900 dark:text-white">
                                            {postData.title || "Untitled Post"}
                                        </h1>
                                        {postData.excerpt && (
                                            <div className=" font-medium text-gray-600 dark:text-gray-300 mb-4 italic py-1">
                                                {postData.excerpt}
                                            </div>
                                        )}
                                        {postData.coverImage && (
                                            <img
                                                src={postData.coverImage}
                                                alt="Cover"
                                                className="w-full h-64 object-cover rounded-xl mb-8 shadow-md"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        )}
                                        {!postData.content ? (
                                            <p className="text-neutral-500 dark:text-neutral-400 text-base mt-5">Start writing to see preview...</p>
                                        ) : (
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                                                components={{
                                                    h1: ({ node, children, ...props }) => {
                                                        const id = generateId(String(children));
                                                        return <h1 id={id} className="scroll-mt-24 text-3xl font-bold mt-12 mb-6 text-dark-secondary dark:text-light-secondary tracking-tight" {...props}>{children}</h1>
                                                    },
                                                    h2: ({ node, children, ...props }) => {
                                                        const id = generateId(String(children));
                                                        return <h2 id={id} className="scroll-mt-24 text-2xl font-bold mt-10 mb-4 text-dark-secondary dark:text-light-secondary tracking-tight" {...props}>{children}</h2>
                                                    },
                                                    h3: ({ node, children, ...props }) => {
                                                        const id = generateId(String(children));
                                                        return <h3 id={id} className="scroll-mt-24 text-xl md:text-2xl font-semibold mt-8 mb-3 text-dark-secondary dark:text-light-secondary" {...props}>{children}</h3>
                                                    },
                                                    p: ({ node: _node, ...props }) => (
                                                        <p className="mb-4 text-base md:text-lg leading-8 text-neutral-700 dark:text-neutral-300 font-light" {...props} />
                                                    ),
                                                    a: ({ node: _node, ...props }) => (
                                                        <a className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline underline-offset-2 transition-colors" {...props} />
                                                    ),
                                                    code: ({ node: _node, inline, className, children, ...props }: any) => {
                                                        const match = /language-(\w+)/.exec(className || '');
                                                        const isInline = inline || !match;
                                                        return isInline ? (
                                                            <code className="px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-mono border border-indigo-100 dark:border-indigo-800 break-words" {...props}>{children}</code>
                                                        ) : (
                                                            <code className={`${className} block text-sm font-mono`} {...props}>{children}</code>
                                                        );
                                                    },
                                                    ul: ({ node: _node, ...props }) => (<ul className="list-disc list-outside mb-6 ml-6 text-neutral-700 dark:text-neutral-300 space-y-2 marker:text-indigo-500" {...props} />),
                                                    ol: ({ node: _node, ...props }) => (<ol className="list-decimal list-outside mb-6 ml-6 text-neutral-700 dark:text-neutral-300 space-y-2 marker:text-indigo-500 font-medium" {...props} />),
                                                    blockquote: ({ node: _node, ...props }) => (<blockquote className="border-l-4 border-indigo-500 bg-light-secondary dark:bg-gray-800/50 pl-6 py-4 italic my-8 text-neutral-700 dark:text-neutral-300 rounded-r-lg shadow-sm" {...props} />),
                                                    img: ({ node: _node, ...props }) => (<img className="w-full h-auto rounded-xl my-8 border border-neutral-200 dark:border-neutral-700 shadow-md" {...props} alt={props.alt || "Blog Image"} />),
                                                    strong: ({ node: _node, ...props }) => (<strong className="font-bold text-dark-primary dark:text-light-primary" {...props} />),
                                                    hr: ({ node: _node, ...props }) => (<hr className="my-10 border-t border-neutral-200 dark-border" {...props} />),
                                                    table: ({ node: _node, ...props }) => (<div className="overflow-x-auto my-8 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm"><table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700" {...props} /></div>),
                                                    thead: ({ node: _node, ...props }) => (<thead className="bg-gray-50 dark:bg-gray-800" {...props} />),
                                                    th: ({ node: _node, ...props }) => (<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider" {...props} />),
                                                    td: ({ node: _node, ...props }) => (<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-700" {...props} />),
                                                }}
                                            >
                                                {postData.content}
                                            </ReactMarkdown>
                                        )}
                                    </article>
                                ) : (
                                    <div className="mt-4">
                                        <pre className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800/50 text-sm font-mono text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap break-words border border-neutral-200 dark:border-neutral-700">
                                            {getRawContent()}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={"flex flex-col sm:flex-row items-center justify-between px-8 py-5 border-t bg-accent/30 gap-4 shrink-0"}>
                        <button type="button" onClick={() => setIsOpen(false)} disabled={isLoading || isGenerating} className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 py-2 px-6 w-full sm:w-fit disabled:opacity-50"}>
                            Cancel
                        </button>
                        <div className={"flex flex-wrap gap-3 justify-end"}>
                            <button
                                type="button"
                                onClick={handleSaveDraft}
                                disabled={isLoading || isGenerating}
                                className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 py-2 px-5 w-full sm:w-fit disabled:opacity-50 disabled:cursor-not-allowed"}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className={"w-4 h-4 mr-2"} />
                                        <span>Save Draft</span>
                                    </>
                                )}
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading || isGenerating}
                                className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 py-2 px-6 w-full sm:w-fit disabled:opacity-50 disabled:cursor-not-allowed"}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>{initialData ? "Updating..." : "Publishing..."}</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className={"w-4 h-4 mr-2"} />
                                        <span>{initialData ? "Update Post" : "Publish"}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};
export default BlogPopUp;