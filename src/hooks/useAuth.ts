import {useSelector} from "react-redux";
import type {RootState} from "@/redux/store.ts";

export const useAuth = () => {
    const data = useSelector((state: RootState) => state.auth);
    return data;
};