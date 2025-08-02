'use client'

import {mdiLogout} from "@mdi/js";
import Button from "@/components/io/Button";
import React from "react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {setToken, setUser} from "@/store/userStore";
import GuestRoutes from "@/assets/ts/other/GuestRoutes";

export default function SignOutButton() {

    const dispatch = useDispatch();
    const router = useRouter();

    function signOut() {
        dispatch(setUser(null));
        dispatch(setToken(null));
        router.push(GuestRoutes.SIGNIN.PATH);
    }

    return <Button icon={mdiLogout} onClick={signOut}/>
}