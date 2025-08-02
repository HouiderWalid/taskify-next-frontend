'use client'

import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";

type Props = {
    href: string
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
}

export default function NextLink(props: Props) {

    const pathname = usePathname();
    const isActive = pathname === props.href || [pathname, '/'].join('') === props.href
    const className = [props.className, isActive ? props.activeClassName : ''].join(' ')

    return <Link className={className} href={props.href}>
        {props.children}
    </Link>
}