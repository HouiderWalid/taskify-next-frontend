import React, {useEffect, useRef, useState} from "react";
import {v4} from "uuid";
import clsx from "clsx";

type Props = {
    button: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
    children: React.ReactNode;
}

export default function Menu(props: Props) {

    const id = v4()
    const menuRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false);

    function onActivated(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()
        console.log('onActivated')
        setIsOpen(!isOpen);
    }

    const button = React.cloneElement(props.button, {
        onClick: onActivated
    })

    const clickOutsideCallBack = (e: MouseEvent) => {
        if (e.defaultPrevented) return;

        const menuId = menuRef.current?.id ?? ''
        if (document.getElementById(menuId)) {
            const escapedId = CSS.escape(menuId);

            if (isOpen && e.target instanceof HTMLElement && e.target.closest(`#${escapedId}`)) {
                setIsOpen(false)
                return
            }

            setIsOpen(e.target instanceof HTMLElement && !!e.target.closest(`#${escapedId}`))
        }
    }

    useEffect(() => {
        document.addEventListener('click', clickOutsideCallBack)
        return () => document.removeEventListener('click', clickOutsideCallBack)
    }, [isOpen])

    return <div className="relative">
        {button}
        <div ref={menuRef} id={id}
             className={clsx({'hidden': !isOpen}, "absolute z-10 top-[50px] bg-white rounded-lg")}>
            {props.children}
        </div>
    </div>
}