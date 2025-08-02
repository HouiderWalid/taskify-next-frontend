'use client'

import Button from "@/components/io/Button";
import Icon from "@mdi/react";
import {mdiShieldOutline} from "@mdi/js";
import {useUser} from "@/components/UserProvider";
import {useRouter} from "next/navigation";
import Authentication from "@/layouts/Authentication";

export default function NotPermitted() {

    const {logout} = useUser()
    const router = useRouter()

    function signOutCall() {
        logout();
        router.push('/signin');
    }

    return <Authentication>
        <div className="flex items-center justify-center w-full h-full">
            <div
                className="w-full max-w-md flex flex-col text-white items-center gap-4 bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
                <Icon path={mdiShieldOutline} size={10}/>
                <span className="text-3xl font-bold">403</span>
                <span className="text-2xl">Access Denied</span>
                <span className="text-gray-100">You don't have permission to access this page</span>
                <Button to="/" className="w-full" variant="filled-reversed">Return to Home</Button>
                <Button onClick={signOutCall} className="w-full" variant="outlined-reversed">
                    Logout
                </Button>
            </div>
        </div>
    </Authentication>;
}