'use client'

import React, {createContext, useContext, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLocale, setLocale, SupportedLocale} from "@/store/localeStore";
import {getTranslation} from "@/i18n/dictionaries";

type LanguageManager = {
    language: string;
    direction: 'ltr' | 'rtl';
    setLanguage: (language: SupportedLocale) => void;
    t: (key: string) => any;
}

const defaultLanguageManager: LanguageManager = {
    language: 'en',
    direction: 'ltr',
    setLanguage: (v: SupportedLocale) => {},
    t: (key: string) => key
}

const LocaleContext = createContext<LanguageManager>(defaultLanguageManager);

export default function LocaleProvider({children}: { children: React.ReactNode }) {

    const language = useSelector(getLocale);
    const dispatch = useDispatch();
    const direction = useMemo(() => language === 'ar' ? 'rtl' : 'ltr', [language])
    const setLanguage = (locale: SupportedLocale) => {
        dispatch(setLocale(locale))
    };
    const translate = (path: string) => getTranslation(language, path);

    return <LocaleContext.Provider value={{direction, language, setLanguage, t: translate}}>
        {children}
    </LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);