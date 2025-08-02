'use client'

import {UseFormRegister} from "react-hook-form";
import {ChangeEvent, useMemo} from "react";
import SelectFieldOption from "@/components/io/select/SelectFieldOption";
import {v4 as uuidv4} from 'uuid'

type Props = {
    value?: any,
    errorMessages?: Array<any>,
    name: string,
    label?: string,
    theme?: string,
    items: Array<any>,
    hideDetails?: Boolean,
    itemValueKey?: string,
    itemTextKey?: string,
    registerAction?: UseFormRegister<any>,
    onChange?: (v:any) => void
}

export default function SelectField(
    {
        name,
        theme = undefined,
        errorMessages = [],
        label = '',
        items = [],
        itemValueKey = 'value',
        itemTextKey = 'text',
        hideDetails = false,
        value = null,
        registerAction,
        onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        }
    }: Props
) {

    const id = uuidv4()

    const titleStyle = useMemo(() => {

        switch (theme) {
            case 'blurry':
                return 'text-white'
            default:
                return 'text-black'
        }

    }, [theme])

    const inputStyle = useMemo(() => {

        switch (theme) {
            case 'blurry':
                return 'bg-white/20 placeholder:text-white/30 border-white/20 text-white'
            default:
                return 'border-black text-black placeholder:text-blue/60 text-black'
        }

    }, [theme])

    const firstMessage = useMemo(() => errorMessages[0], [errorMessages])

    function onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
        if (onChange) {
            onChange(e.target.value)
        }
    }

    return <div>
        <div className="flex flex-col gap-2">
            {
                label && <label htmlFor={id} className={titleStyle}>
                    {label}
                </label>
            }
            <select id={id} {...(registerAction ? registerAction(name) : {})} value={value} onChange={onSelectChange}
                    className={`${firstMessage ? 'border-red-400!' : ''} ${inputStyle} px-3 py-2 outline-0 border focus:outline-1 focus:ring-primary-500 focus:border-primary-500 rounded-lg`}>
                {
                    items.map((item, i) => {
                        return <SelectFieldOption key={i} option={item} optionTextKey={itemTextKey}
                                                  optionValueKey={itemValueKey}/>
                    })
                }
            </select>
        </div>
        {!hideDetails && <div className="text-red-400 h-5 text-xs mt-0.5">{firstMessage}</div>}
    </div>
}