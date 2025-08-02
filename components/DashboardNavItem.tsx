import React from "react";
import Icon from "@mdi/react";
import NextLink from "@/components/NextLink";

type Props = {
    href: string
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
    icon?: any
}

export default function DashboardNavItem(props: Props) {

    const className = ['flex cursor-pointer gap-3', props.className].join(' ')

    return <NextLink className={className} href={props.href} activeClassName={props.activeClassName}>
        {props.icon && <Icon size={1} path={props.icon}/>}
        {props.children}
    </NextLink>
}