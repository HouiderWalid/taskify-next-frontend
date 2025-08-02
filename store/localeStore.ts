import {createSlice} from "@reduxjs/toolkit";
import {StoreState} from "@/store/store";
import {RequestCookies} from "next/dist/server/web/spec-extension/cookies";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const STORAGE_KEY = "taskify-next-locale";
export const STORAGE_PERSISTENCE_KEY = 'persist:taskify-next-locale'

const SUPPORTED_LOCALES = ['en', 'fr', 'ar'] as const;

export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

type LocaleStoreState = {
    locale: SupportedLocale,
}

const initialState: LocaleStoreState = {
    locale: 'en'
}

const localeStoreSlice = createSlice({
    name: "localeStore",
    initialState,
    reducers: {
        setLocale: (state, action) => {
            state.locale = action.payload
        }
    }
})

export const getLocale = (state: StoreState, cookies?: RequestCookies | ReadonlyRequestCookies): SupportedLocale => {

    if (typeof window === 'undefined') {
        if (cookies) {
            let appStateData = null
            try {
                appStateData = JSON.parse(cookies.get(encodeURIComponent(STORAGE_PERSISTENCE_KEY))?.value ?? '')
            } catch (e) {

            }

           return String(appStateData?.locale).replace(/^"|"$/g, '') as SupportedLocale
        }

        return 'en'
    }else {
        return state.localeStore.locale as SupportedLocale
    }

}

export const {setLocale} = localeStoreSlice.actions;

export default localeStoreSlice.reducer