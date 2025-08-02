'use client'

import React, {createContext, useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAuthUser, setToken, setUser} from "@/store/userStore";
import User from "@/assets/ts/models/User";
import {useRouter} from "next/navigation";
import {persistor} from "@/store/store";

type UserManager = {
    user: User | null,
    logout: () => void,
}

const defaultUserManager: UserManager = {
    user: null,
    logout: () => {

    }
}

const UserContext = createContext<UserManager>(defaultUserManager);

export default function UserProvider({children}: { children: React.ReactNode }) {

    const user = useSelector(getAuthUser)
    const dispatch = useDispatch();
    const router = useRouter();

    function logout() {
        persistor.purge().then(() => {
            dispatch(setUser(null))
            dispatch(setToken(null))
            router.push('/signin')
        })
    }

    return <UserContext.Provider value={{user, logout}}>
        {children}
    </UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);