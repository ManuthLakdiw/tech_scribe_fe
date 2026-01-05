import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";
import Footer from "./Footer.tsx";

const Layout = () => {
    return (
        <div className={"w-full dark:bg-dark-primary"}>
            <Header/>
            <main className="min-h-screen">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}
export default Layout
