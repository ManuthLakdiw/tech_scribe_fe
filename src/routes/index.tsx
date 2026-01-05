import {lazy, type ReactNode, Suspense} from "react";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import RouteLoading from "../components/RouteLoading.tsx";
import Layout from "../components/Layout.tsx";
import BlogContent from "../components/blogs/BlogContent.tsx";
import Authors from "../pages/Authors.tsx";
import {useAuth} from "@/hooks/useAuth.ts";

const Home = lazy(() => import("../pages/Home.tsx"))
const Blogs = lazy(() => import("../pages/Blogs.tsx"))
const Categories = lazy(() => import("../pages/Categories.tsx"))
const About = lazy(() => import("../pages/About.tsx"))
const Contact = lazy(() => import("../pages/Contact.tsx"))
const Login = lazy(() => import("../pages/Login.tsx"))
const GetStarted = lazy(() => import("../pages/GetStarted.tsx"))
const CategoryPosts = lazy(() => import("../components/categories/CategoryPosts.tsx"))
const AuthorPanel = lazy(() => import("@/pages/AuthorPanel"))
const AdminPanel = lazy(() => import("@/pages/AdminPanel"))
const DashBoardLayout = lazy(() => import("@/pages/DashBoard.tsx"))
const BecomeAuthor = lazy(() => import("@/pages/BecomeAuthor"))
const ResetPassword = lazy(() => import("@/pages/ResetPassword.tsx"))
const Settings = lazy(() => import("@/pages/Settings.tsx"))

type RequireAuthTypes = { children: ReactNode; roles?: string[] }

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
    const { user} = useAuth()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (roles && !roles.some((role) => user.roles?.includes(role))) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold mb-2">Access Denied</h2>
                <p>You do not have permission to view this page.</p>
            </div>
        )
    }
    return <>{children}</>
}

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <GetStarted/>
    },
    {
        path: "/become-author",
        element: (
            <RequireAuth>
                <BecomeAuthor/>
            </RequireAuth>
        )
    },
    {
        path: "/reset-password",
        element: <ResetPassword/>
    },
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/blogs",
                element: <Blogs/>
            },
            {
                path: "/blogs/:id",
                element: <BlogContent/>
            },
            {
                path: "/categories",
                element: <Categories/>
            },
            {
                path: "/categories/:categoryName",
                element: <CategoryPosts/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/authors",
                element: <Authors/>
            },
            {
                path: "/settings",
                element: <Settings/>
            }
        ]
    },
    {
        path: "/dashboard",
        element: (
            <RequireAuth>
                <DashBoardLayout />
            </RequireAuth>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="author" replace />
            },
            {
                path: "author-panel",
                element: (
                    <RequireAuth roles={['AUTHOR', 'ADMIN']}>
                        <AuthorPanel/>
                    </RequireAuth>
                )
            },
            {
                path: "admin-panel",
                element: (
                    <RequireAuth roles={['ADMIN']}>
                        <AdminPanel/>
                    </RequireAuth>
                )
            }
        ]
    },
    {
        path: "*",
    }
])

export const AppRouter = () => {
    return (
        <Suspense fallback={<RouteLoading/>}>
            <RouterProvider router={router}/>
        </Suspense>
    )
}

export default AppRouter

