import React from "react";
import clsx from "clsx";

type Props = {
    bgColor?: string;
    color?: string;
    children?: React.ReactNode;
}

export default function Chip(
    {
        bgColor = 'bg-gray-500',
        color = 'text-white',
        children
    }:Props
) {

    return <div className={clsx("rounded-xl py-1 px-3 text-xs", bgColor, color)}>
        {children}
    </div>
}