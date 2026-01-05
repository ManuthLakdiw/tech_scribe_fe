import NavBtn from "@/components/panels/NavBtn.tsx";
import {ChartColumn, Home, LogOut, PenTool} from "lucide-react";
import {useAuth} from "@/hooks/useAuth.ts";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const DashBoard = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // URL eka ganna

    const ADMIN_PATH = "/dashboard/admin-panel";
    const AUTHOR_PATH = "/dashboard/author-panel";

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
        }
    }, [user, isLoading, navigate]);


    if (isLoading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) return null;

    const { profilePictureURL: profilePic, color, shortName: initial, fullname: name, roles} = user;
    const userRoles = (roles || []) as string[];
    const isAdmin = userRoles.includes("ADMIN");


    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
        return <Navigate to={isAdmin ? ADMIN_PATH : AUTHOR_PATH} replace />;
    }

    return (
        <div className={"w-full min-h-screen relative"}>
            <aside className={"fixed left-0 top-0 bottom-0 w-64 bg-light-secondary dark:bg-dark-secondary border-r border-border p-6 hidden lg:block"}>
                <h1 className={"font-bold text-2xl bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end w-fit " +
                    "bg-clip-text text-transparent mb-8"}
                >
                    TechScribe
                </h1>
                <nav className={"space-y-2"}>
                    <NavBtn icon={Home} text="Home" pathname={"/"} />
                    {isAdmin && (
                        <NavBtn
                            icon={ChartColumn}
                            text="Admin Panel"
                            pathname={ADMIN_PATH}
                            isSelected={location.pathname.includes("admin-panel")}
                            onClick={() => navigate(ADMIN_PATH)}
                        />
                    )}
                    <NavBtn
                        icon={PenTool}
                        text="Author panel"
                        pathname={AUTHOR_PATH}
                        isSelected={location.pathname.includes("author-panel")}
                        onClick={() => navigate(AUTHOR_PATH)}
                    />
                </nav>
                <div className={"absolute bottom-6 left-6 right-6"}>
                    <div className={"flex items-center gap-3 mb-4"}>
                        <div className={"flex items-center gap-3 mb-4"}>
                            <span className={"relative flex size-8 shrink-0 overflow-hidden rounded-full"}>
                                {profilePic ? (
                                    <img
                                        src={profilePic}
                                        alt={initial}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className={`w-full h-full flex items-center justify-center text-light-secondary font-bold text-sm bg-gradient-to-br ${color}`}
                                    >
                                        {initial}
                                    </div>
                                )}
                            </span>
                            <div className={"flex-1 min-w-0"}>
                                <p className={"font-semibold truncate"}>{name}</p>
                                <p className={"text-xs text-neutral-strong dark:text-neutral-medium capitalize"}>Author</p>
                            </div>
                        </div>
                    </div>
                    <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-300 ease-in-out " +
                        "text-dark-secondary dark:text-light-secondary " +
                        " bg-light-secondary dark:bg-overlay-light hover:bg-neutral-soft/5 dark:hover:bg-white/8 shadow-xs h-9 px-4 py-2 w-full border border-neutral-soft dark-border"}>
                        <LogOut className={" w-4 h-4"} />
                        Logout
                    </button>
                </div>
            </aside>
            <main className={"lg:ml-64 p-4 md:p-6 bg-light-primary dark:bg-dark-primary relative"}>
                <Outlet/>
            </main>
        </div>
    )
}
export default DashBoard
