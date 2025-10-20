import React from "react";
import clsx from "clsx";
import Icon from "@mdi/react";
import {mdiClose} from "@mdi/js";

type Props = {
    id?: any,
    onClose?: (e: React.MouseEvent) => void,
    value: boolean,
    title?: React.ReactNode,
    children?: React.ReactNode,
    action?: React.ReactNode,
}

export default function Modal(props: Props) {

    function onContainerClick(e: React.MouseEvent) {
        if (e.target === e.currentTarget && props.onClose) {
            props.onClose(e)
        }
    }

    return <div id={props.id} aria-hidden="true" onClick={onContainerClick}
                className={clsx(
                    "overflow-y-auto overflow-x-hidden bg-black/50 fixed justify-center items-center w-full md:inset-0 h-screen",
                    props.value ? 'flex' : 'hidden'
                )}>
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm">
                <div
                    className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {props.title}
                    </h3>
                    <div onClick={props.onClose}>
                        <Icon path={mdiClose} size={1}/>
                    </div>
                </div>
                <div className="p-4 md:p-5">
                    {props.children}
                </div>
                <div className="flex items-center justify-end gap-4 p-4 md:p-5 border-t border-gray-200 rounded-b">
                    {props.action}
                </div>
            </div>
        </div>
    </div>
}