import {
    FileText,
    Heart,
    LogOut,
    MessageSquare,
    Shield,
    TrendingUp,
    UserPlus,
    Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth.ts";
import ResponsiveGrid from "@/components/ResponsiveGrid.tsx";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {useNavigate} from "react-router-dom";
import { cn } from "@/utils/cnUtil.ts";
import StatCard from "@/components/panels/StatCard.tsx";
import UsersSection from "@/components/panels/admin/UsersSection.tsx";
import PostsSection from "@/components/panels/admin/PostsSection.tsx";
import CommentsSection from "@/components/panels/admin/CommentsSection.tsx";
import AuthorRequestSection from "@/components/panels/admin/AuthorRequestSection.tsx";


const details = [
    {
        icon: <Users className={"w-4 h-4 text-blue-500"} />,
        title: "Total Users",
        value: 320
    },
    {
        icon: <Users className={"w-4 h-4 text-purple-500"} />,
        title: "Total Authors",
        value: 250
    },
    {
        icon: <FileText className={"w-4 h-4 text-green-500"} />,
        title: "Total Posts",
        value: 73
    },
    {
        icon: <MessageSquare className={"w-4 h-4 text-yellow-500"} />,
        title: "Comments",
        value: 51
    },
    {
        icon: <Heart className={"w-4 h-4 text-red-500"} />,
        title: "Total Likes",
        value: 30
    },
    {
        icon: <TrendingUp className={"w-4 h-4 text-indigo-500"} />,
        title: "subscribers",
        value: 97
    },
]

const tabs = [
    {
        id: "users",
        label: "Users",
        icon: Users
    },
    {
        id: "posts",
        label: "Posts",
        icon: FileText
    },
    {
        id: "comments",
        label: "Comments",
        icon: MessageSquare
    },
    {
        id: "author-requests",
        label: "Author Requests",
        icon: UserPlus
    }

];

const AdminDashBoard = () => {

    const { user, isLoading } = useAuth()
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("users");

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
        }
    }, [user, navigate]);


    if (!user) return null;

    return (
        <div>
            <div className={
                "fixed top-0 right-0 left-0 lg:left-64 z-40 " +
                "bg-light-primary/95 dark:bg-dark-primary/95 backdrop-blur-md " +
                "p-4 md:p-6 flex flex-col gap-4"
            }>

                <div className={"lg:hidden flex items-center justify-between w-full"}>
                    <h1 className={"font-bold text-xl w-fit bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent"}>
                        TechScribe
                    </h1>
                    <div className={"flex items-center gap-2"}>
                        <button className={"whitespace-nowrap text-sm font-medium rounded-md h-8 px-3 shadow-xs bg-light-secondary dark:bg-dark-secondary text-dark-secondary dark:text-light-secondary border border-neutral-soft dark-border"}>
                            Home
                        </button>
                        <button className={"whitespace-nowrap text-sm font-medium rounded-md h-8 px-3 shadow-xs bg-light-secondary dark:bg-dark-secondary text-dark-secondary dark:text-light-secondary border border-neutral-soft dark-border"}>
                            <LogOut className={"w-4 h-4"} />
                        </button>
                    </div>
                </div>


                <div className={"flex items-center justify-between w-full"}>
                    <div>
                        <h1 className={"text-2xl md:text-3xl font-bold text-dark-secondary dark:text-light-secondary"}>Admin Dashboard</h1>
                        <p className={"text-neutral-strong dark:text-neutral-medium font-light text-sm"}>Manage your content</p>
                    </div>
                    <span className={"inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 " +
                        "overflow-hidden border-transparent bg-secondary text-secondary-foreground gap-1"}>
                        <Shield className={"w-3 h-3"} />
                        Admin
                    </span>
                </div>

            </div>
            <div className={"pt-40 sm:pt-24"}>
                <div
                    className={"mb-8"}
                >
                    <ResponsiveGrid defCols={2} mdCols={3} lgCols={6} className={"gap-3"}>
                        {details.map((item, index) => (
                            <StatCard key={index} item={item} index={index} />
                        ))}
                    </ResponsiveGrid>
                </div>

                {/* TABS BUTTONS */}
                <div className="bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center px-4 py-1 text-sm font-medium whitespace-nowrap gap-2 transition-colors 
                    
                         ${activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="active-tab-indicator"
                                    className="absolute inset-0 rounded-md border border-neutral-soft dark-border bg-light-primary dark:bg-white/4"
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30
                                    }}
                                />
                            )}

                            <span className="relative z-10 flex items-center gap-2">
                                    <tab.icon className="w-4 h-4" />
                                    <span className={"hidden md:inline-block"}>{tab.label}</span>
                                </span>
                        </button>
                    ))}
                </div>

                <div className={cn(
                    "mt-2",
                    { "bg-card  text-card-foreground flex flex-col gap-6 rounded-xl border py-6 px-6 shadow-sm":
                            activeTab === "drafts" ||
                            activeTab === "comments"
                    }
                )}>
                    <AnimatePresence mode="wait">
                        {activeTab === "users" && (
                            <UsersSection/>
                        )}
                        {activeTab === "posts" && (
                            <PostsSection/>
                        )}
                        {activeTab === "comments" && (
                            <CommentsSection/>
                        )}
                        {activeTab === "author-requests" && (
                            <AuthorRequestSection/>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
export default AdminDashBoard;