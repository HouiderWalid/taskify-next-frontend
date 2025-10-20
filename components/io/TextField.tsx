'use client'

import {ChangeEventHandler, useMemo} from "react";
import {UseFormRegister} from "react-hook-form";

type Props = {
    id: string,
    value?: any,
    setValue?: (value: any) => void,
    errorMessages?: Array<any>,
    name: string,
    label?: string,
    type?: 'text' | 'password' | 'datetime-local',
    theme?: string,
    placeholder?: string,
    hideDetails?: Boolean,
    registerAction: UseFormRegister<any>;
}

export default function TextField(
    {
        id,
        value = undefined,
        setValue = (value)=>{},
        name,
        theme = undefined,
        errorMessages = [],
        label = '',
        type = 'text',
        placeholder = '',
        hideDetails = false,
        registerAction
    }: Props) {

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

    function onChange(e:any) {
        setValue && setValue(e.target?.value)
    }

    return <div>
        <div className="flex flex-col gap-2">
            {
                label && <label htmlFor={id} className={titleStyle}>
                    {label}
                </label>
            }
            <input value={value} id={id} type={type} placeholder={placeholder} {...registerAction(name)} onChange={onChange}
                   className={`${firstMessage ? 'border-red-400!' : ''} ${inputStyle} px-3 py-2 outline-0 border focus:outline-1 focus:ring-primary-500 focus:border-primary-500 rounded-lg`}
                   />
        </div>
        {!hideDetails && <div className="text-red-400 h-5 text-xs mt-0.5"> {firstMessage}</div>}
    </div>
}