import {getAuthUser, setToken, setUser, STORAGE_PERSISTENCE_KEY} from "@/store/userStore";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {isObjectLike} from "lodash-es";
import User from "@/assets/ts/models/User";
import {useDispatch, useSelector} from "react-redux";
import {RequestCookies} from "next/dist/server/web/spec-extension/cookies";

export function useServerUser(cookies: ReadonlyRequestCookies | RequestCookies) {

    let user = null

    try {
        const appStateData = JSON.parse(cookies.get(encodeURIComponent(STORAGE_PERSISTENCE_KEY))?.value ?? '')
        user = JSON.parse(String(appStateData?.user).replace(/^"|"$/g, ''))
        user = isObjectLike(user) ? new User(user) : null
    } catch (e) {

    }

    return {
        user,
    }
}

export function useClientUser() {
    const user = useSelector(getAuthUser)

    return {
        user,
        signOut(){
            const dispatch = useDispatch();
            dispatch(setToken(null))
            dispatch(setUser(null))
        }
    }
}