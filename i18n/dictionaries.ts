import {isObjectLike} from "lodash-es";
import {SupportedLocale} from "@/store/localeStore";
import en from "@/i18n/messages/en";
import ar from "@/i18n/messages/ar";
import fr from "@/i18n/messages/fr";

const dictionaries = {
    en,
    ar,
    fr
}

export const getTranslation = (locale: SupportedLocale, path: string): any => {
    const dictionary = dictionaries[locale]
    return isObjectLike(dictionary) ? path.split('.').reduce((init: Record<string, any>, next: string) => init?.[next], dictionary) : path
}