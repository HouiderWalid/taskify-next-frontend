import {UseFormRegister} from "react-hook-form";
import {v4} from "uuid";
import {useEffect, useMemo, useState} from "react";
import {get, isObjectLike} from "lodash-es";
import clsx from "clsx";
import Icon from "@mdi/react";
import {mdiChevronDown, mdiChevronUp, mdiClose} from "@mdi/js";
import List from "@/components/List"
import ListObjectItem from "@/components/io/select/ListObjectItem";
import {useClientLocale} from "@/composables/useServerLocale";

type Props = {
    value?: any,
    setValue?: (value: any) => void,
    errorMessages?: Array<any>,
    name: string,
    label?: string,
    labelClasses?: string,
    theme?: string,
    items: Array<any>,
    hideDetails?: Boolean,
    itemValueKey?: string,
    itemTextKey?: string,
    inputClasses?: string,
    placeholder?: string,
    registerAction?: UseFormRegister<any>,
    onChange?: (v: any) => void
}

export default function Autocomplete(
    {
        value = undefined,
        setValue = (value) => {
        },
        name,
        theme = undefined,
        errorMessages = [],
        label = '',
        items = [],
        labelClasses = 'text-black',
        itemTextKey = 'text',
        itemValueKey = 'value',
        hideDetails = false,
        placeholder = '',
        inputClasses = 'border-black text-black placeholder:text-primary/60',
        registerAction
    }: Props
) {

    const id = v4()
    const containerId = [id, 'container'].join('-')
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false)
    const firstMessage = useMemo(() => errorMessages[0], [errorMessages])
    const valueText = useMemo(() => isObjectLike(value) ? get(value, itemTextKey) : value, [value])
    const [search, setSearch] = useState<string>('')
    const listItems = useMemo(() => items.filter(item => new RegExp(search, 'gi').test(get(item, itemTextKey))), [items, search])

    const clickOutsideCallBack = (e: MouseEvent) => {
        const escapedId = CSS.escape(containerId);
        if (e.target instanceof HTMLElement && !e.target.closest(`#${escapedId}`)) {
            setIsInputFocused(false)
        }
    }

    function objectItemClicked(item: any) {
        setValue(item)
        setIsInputFocused(false)
    }

    function toggleInputFocused() {
        const input = id ? document.getElementById(id) : null
        if (input instanceof HTMLInputElement) {
            isInputFocused ? input.blur() : input.focus()
        }
    }

    useEffect(() => {
        document.addEventListener('click', clickOutsideCallBack)
        return () => document.removeEventListener('click', clickOutsideCallBack)
    }, [isInputFocused])

    const {t} = useClientLocale()

    return <div className="p-0 border-0">
        <div id={containerId} className="flex relative flex-col gap-2">
            <label v-if="props.label" htmlFor={id} className={labelClasses}>
                {label}
            </label>
            <div className={clsx(
                'px-3 py-2 flex gap-2 border bg-white focus-within:ring-primary-500 focus-within:border-primary-500 rounded-lg',
                {'border-red-400!': firstMessage}, inputClasses
            )}>
                {valueText && <span className="text-nowrap">{valueText}</span>}
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                       onFocus={() => setIsInputFocused(true)} id={id} type="text"
                       className="p-0 border-0 focus:border-0! focus:outline-0! focus:shadow-[none]! w-full"
                       placeholder={placeholder} name={name}/>
                {search.length > 0 && <div onClick={() => setSearch('')}>
                    <Icon path={mdiClose} v-if="search.length" className="cursor-pointer" size={1}/>
                </div>}
                <div onClick={() => toggleInputFocused}>
                    <Icon className="cursor-pointer" path={isInputFocused ? mdiChevronUp : mdiChevronDown} size={1}/>
                </div>
            </div>
            {
                isInputFocused &&
                <List className="bg-white absolute w-full max-h-60 shadow-md overflow-auto top-20 z-10">
                    {
                        listItems.length > 0 ? listItems.map((listItem, i) => {
                            return <ListObjectItem key={i} selected={value} item={listItem}
                                                   onClick={() => objectItemClicked(listItem)} itemTextKey={itemTextKey}
                                                   itemValueKey={itemValueKey}/>
                        }) : <li className="p-2">{t('components.autocomplete.noResultsFound')}</li>
                    }
                </List>
            }
        </div>
        {
            !hideDetails && <div className="text-red-400 h-5 text-xs mt-0.5"> {firstMessage}</div>
        }
    </div>
}