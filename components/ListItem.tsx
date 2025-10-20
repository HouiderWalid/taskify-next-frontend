import React from "react";
import clsx from "clsx";

type Props = {
    id?:any,
    children?: React.ReactNode,
    onClick?: (e: React.MouseEvent) => void,
    className?: string,
}

export default function ListItem(props: Props) {
    return <li id={props.id} className={clsx("px-4 py-2 hover:bg-primary-200 cursor-pointer", props.className)} onClick={props.onClick}>
        {props.children}
    </li>
}