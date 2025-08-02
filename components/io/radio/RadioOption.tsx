import {get, isObjectLike} from "lodash-es";
import {useMemo} from "react";
import {useClientLocale} from "@/composables/useServerLocale";

type Props = {
    selected: any,
    name:string,
    option: any,
    itemValueKey: string
    itemTextKey: string
    setValue?: (value: string) => void
}

export default function RadioOption(
    {
        selected,
        name,
        option,
        itemValueKey = 'value',
        itemTextKey = 'text',
        setValue = e => {},
    }: Props
) {

    const value = useMemo(() => isObjectLike(option) ? get(option, itemValueKey) : option, [option, itemValueKey])
    const text = useMemo(() => isObjectLike(option) ? get(option, itemTextKey) : option, [option, itemTextKey])

    const {t} = useClientLocale()

    return <label className="flex items-center gap-2">
        <input checked={value === selected} type="radio" value={value} name={name} onChange={(e) => setValue(e.target.value)}
               className="w-4 h-4 text-primary-800 bg-gray-100 border-gray-300 focus:ring-primary-500 focus:ring-2"/>
        <span>{t(text)}</span>
    </label>
}