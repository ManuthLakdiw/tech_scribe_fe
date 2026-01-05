import AppRouter from "./routes";
import {Toaster} from "@/components/ui/sonner.tsx";
import {useDispatch} from "react-redux";
import {loadUser} from "@/redux/features/authSlice.ts";
import {useEffect} from "react";
import type {AppDispatch} from "@/redux/store.ts";

// p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20
// w-full min-h-screen text-black bg-light-primary dark:bg-dark-primary dark:text-white

function App() {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

  return (
    <div className={"dark:bg-dark-primary"}>
        <AppRouter/>
        <Toaster position="bottom-right"/>
    </div>
  )
}

export default App
