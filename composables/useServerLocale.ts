import {getTranslation} from "@/i18n/dictionaries";
import {
    getLocale, setLocale, STORAGE_PERSISTENCE_KEY,
    STORAGE_PERSISTENCE_KEY as LOCALE_STORAGE_KEY,
    SupportedLocale
} from "@/store/localeStore";
import {ReadonlyRequestCookies, ResponseCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {useDispatch, useSelector} from "react-redux";
import {RequestCookies} from "next/dist/server/web/spec-extension/cookies";

export function useServerLocale(cookies: ReadonlyRequestCookies | RequestCookies) {
    let language: SupportedLocale = 'en';

    try {
        const appStateData = JSON.parse(cookies.get(encodeURIComponent(STORAGE_PERSISTENCE_KEY))?.value ?? '')
        language = String(appStateData?.locale).replace(/^"|"$/g, '') as SupportedLocale;
    } catch (e) {

    }

    return {
        language,
        t: (path: string) => getTranslation(language, path),
        direction: language === 'ar' ? 'rtl' : 'ltr',
        setLocale(responseCookies: ResponseCookies, locale: SupportedLocale) {

            const expires = new Date();
            expires.setDate(expires.getDate() + 7);

            responseCookies.set({
                name: encodeURIComponent(LOCALE_STORAGE_KEY),
                value: JSON.stringify({locale: JSON.stringify(locale)}),
                expires,
                httpOnly: false,
                sameSite: 'lax',
            })

        }
    }
}

export function useClientLocale() {

    const language = useSelector(getLocale)
    const dispatch = useDispatch();

    return {
        language,
        t: (path: string) => getTranslation(language, path),
        direction: language === 'ar' ? 'rtl' : 'ltr',
        setLocale(locale: SupportedLocale) {
            dispatch(setLocale(locale));
        }
    }
}