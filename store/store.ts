import {configureStore} from "@reduxjs/toolkit";
import UserStoreReducer, {STORAGE_KEY as USER_STORAGE_KEY} from "./userStore"
import LocaleStoreReducer, {STORAGE_KEY as LOCALE_STORAGE_KEY} from "./localeStore"
import { persistReducer, persistStore } from "redux-persist";
import Cookies from 'js-cookie';

const cookieStorage = {
    getItem: (key:any) => {

        try {
            return Promise.resolve(Cookies.get(key) || '');
        }catch(e) {
            return Promise.resolve(e);
        }

    },
    setItem: (key:any, value:any) => {

        try {
            Cookies.set(key, value, {
                expires: 60 * 60 * 24 * 7,
                httpOnly: false,
                sameSite: 'lax',
            });
            return Promise.resolve();
        }catch (e) {
            return Promise.reject(e);
        }

    },
    removeItem: (key:any) => {

        try {
            Cookies.remove(key)
            return Promise.resolve();
        }catch (e){
            return Promise.reject(e);
        }

    }
};

const userPersistConfig = {
    key: USER_STORAGE_KEY,
    storage: cookieStorage,
    whitelist: ["token", "user"],
    debug: true
};

const localePersistConfig = {
    key: LOCALE_STORAGE_KEY,
    storage: cookieStorage,
    whitelist: ["locale"],
    debug: true
};

const userPersistedReducer = persistReducer(userPersistConfig, UserStoreReducer);
const localePersistedReducer = persistReducer(localePersistConfig, LocaleStoreReducer);

export const store = configureStore({
    reducer: {
        userStore: userPersistedReducer,
        localeStore: localePersistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "userStore/setUser",
                    "userStore/setToken",
                    "persist/PURGE"
                ],
            }
        })
})

export type StoreState = ReturnType<typeof store.getState>

export const persistor = persistStore(store);