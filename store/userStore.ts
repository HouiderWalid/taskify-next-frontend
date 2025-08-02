import User from "@/assets/ts/models/User";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {StoreState} from "./store";
import {isObject} from "lodash-es";
import {NextRequest} from "next/server";

export const STORAGE_KEY = "taskify-next-user";
export const STORAGE_PERSISTENCE_KEY = 'persist:taskify-next-user'

type UserStoreState = {
    user: User | null,
    token: string | null
}

const initialState: UserStoreState = {
    user: null,
    token: null,
}

const userStoreSlice = createSlice({
    name: "userStore",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload ? JSON.parse(JSON.stringify(action.payload)) : null
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        }
    }
})

export const getAuthUser = (state: StoreState, request?: NextRequest) => {

    let user = null

    if (typeof window === 'undefined') {

        if (request) {
            try {
                const appStateData = JSON.parse(request.cookies.get(encodeURIComponent(STORAGE_PERSISTENCE_KEY))?.value ?? '')
                user = JSON.parse(String(appStateData?.user).replace(/^"|"$/g, ''))
            } catch (e) {

            }
        }

    } else {
        user = state.userStore.user
    }

    return isObject(user) ? new User(user) : null
};
export const getToken = (state: StoreState, request?: NextRequest) => {

    let token = null

    if (typeof window === 'undefined') {

        if (request) {
            try {
                const appStateData = JSON.parse(request.cookies.get(encodeURIComponent(STORAGE_PERSISTENCE_KEY))?.value ?? '')
                token = JSON.parse(String(appStateData?.token).replace(/^"|"$/g, ''))
            } catch (e) {

            }
        }

    } else {
        token = state.userStore.token
    }

    return token
};

export const {setUser, setToken} = userStoreSlice.actions;

export default userStoreSlice.reducer