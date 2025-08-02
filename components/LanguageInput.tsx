'use client'

import SelectField from "@/components/io/select/SelectField";
import {usePathname, useRouter} from "next/navigation";
import {useClientLocale} from "@/composables/useServerLocale";
import {SupportedLocale} from "@/store/localeStore";

export default function LanguageInput() {

    const languageList = [
        {
            value: "en",
            text: "English",
        },
        {
            value: "ar",
            text: "العربية",
        }
    ]

    const {language, setLocale} = useClientLocale()

    const router = useRouter();
    const pathname = usePathname().replace(/^\/(en|ar)/, '');

    function onLanguageChanged(v: SupportedLocale) {
        setLocale(v)
        router.push(`/${v}${pathname}`);
    }

    return <SelectField value={language} onChange={onLanguageChanged} name="language-input-name"
                        items={languageList} hideDetails={true}/>
}