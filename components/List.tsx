import React from "react";
import clsx from "clsx";

export default function List({children, className = ''}:{children?: React.ReactNode, className?: string}) {
    return <ul className={clsx("border border-gray-200 rounded-lg py-2", className)}>
        {children}
    </ul>
}