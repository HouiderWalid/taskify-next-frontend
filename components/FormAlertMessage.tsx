'use client'

import clsx from "clsx";
import Icon from "@mdi/react";
import React, {useEffect, useMemo} from "react";
import {mdiAlertCircle, mdiCheckCircle, mdiClose, mdiCloseCircle} from "@mdi/js";

type Props = {
    type: 'success' | 'error' | 'warning',
    timeout?: number,
    message: string,
    absolute?: boolean,
    open: boolean,
    fullWidth?: boolean,
    onCloseAction?: () => void,
}
export default function FormAlertMessage(
    {
        type,
        timeout = -1,
        message,
        absolute = false,
        open = false,
        fullWidth = true,
        onCloseAction = () => {}
    }: Props
) {

    useEffect(() => {

        if (!open) {
            return
        }

        setTimeout(() => onCloseAction(), timeout)
    }, [open])

    const icon = useMemo(() => type === 'success' ? mdiCheckCircle : type === 'error' ? mdiCloseCircle : mdiAlertCircle, [type])

    return <div style={{zIndex: 100}}
                className={clsx(
                    'hidden bottom-4 mx-auto left-1/2 items-center w-full p-4 text-white rounded-lg shadow-sm',
                    open && 'flex!',
                    absolute && 'absolute',
                    fullWidth && 'max-w-xs',
                    type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-gray-600'
                )}>
        {icon && <Icon path={icon} size={1}/>}
        <div className="ms-3 text-sm font-normal">{message}</div>
        <div className="ms-auto" onClick={onCloseAction}>
            <Icon path={mdiClose} size={1}/>
        </div>
    </div>
}