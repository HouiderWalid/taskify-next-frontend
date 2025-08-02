import React from "react";
import LanguageInput from "@/components/LanguageInput";
import {mdiAccount, mdiBriefcase, mdiCog, mdiFolder, mdiNoteOutline, mdiViewDashboard} from "@mdi/js";
import Permission from "@/assets/ts/models/permission/Permission";
import DashboardNavItem from "@/components/DashboardNavItem";
import User from "@/assets/ts/models/User";
import Icon from "@mdi/react";
import {useServerLocale} from "@/composables/useServerLocale";
import {cookies} from "next/headers";
import {useServerUser} from "@/composables/useUser";
import SignOutButton from "@/components/SignOutButton";

type Props = {
    children: React.ReactNode;
}

export default async function Dashboard({children}: Props) {

    const navigationList = [
        {
            link: '/',
            name: 'overview',
            translation: 'navbar.overview',
            icon: mdiViewDashboard,
            permission: Permission.VIEW_OVERVIEW
        },
        {
            link: '/projects',
            name: 'projects',
            translation: 'navbar.projects',
            icon: mdiFolder,
            permission: Permission.VIEW_PROJECTS
        },
        {
            link: '/tasks',
            name: 'tasks',
            translation: 'navbar.tasks',
            icon: mdiNoteOutline,
            permission: Permission.VIEW_TASKS
        },
        {
            link: '/users',
            name: 'users',
            translation: 'navbar.users',
            icon: mdiAccount,
            permission: Permission.VIEW_USERS
        },
        {
            link: '/settings',
            name: 'settings',
            translation: 'navbar.settings',
            icon: mdiCog,
            permission: Permission.VIEW_SETTINGS
        }
    ]

    const {language, direction, t} = useServerLocale(await cookies())
    const {user} = useServerUser(await cookies())
    const fullName = user instanceof User ? user.getFullName() : null
    const nameLetters = fullName ? String(fullName).split(' ').map(name => String(name).charAt(0).toUpperCase()).join('') : null

    return <div dir={direction} className="h-screen overflow-auto bg-primary-50">
        <div className="bg-white shadow-sm flex justify-center">
            <div className="bg-white w-full max-w-6xl p-4 px-6 flex justify-center items-center">
                <div className="w-full">
                    <span className="flex items-center gap-3 text-3xl text-blue-800 font-bold">
                        <Icon path={mdiBriefcase} size={1.5}/>
                        <span>Taskify</span>
                    </span>
                </div>
                <div className="flex gap-4 items-center justify-center">
                    <LanguageInput/>
                    <div
                        className="rounded-full flex justify-center text-xs items-center bg-primary-800 text-white h-9 w-9">
                        {nameLetters}
                    </div>
                    <SignOutButton/>
                </div>
            </div>
        </div>
        <div className="flex justify-center">
            <div className="w-full max-w-6xl flex gap-10 px-6 py-10">
                <div className="w-72 flex flex-col gap-2">
                    {
                        navigationList.map((item, i) => {
                            return <DashboardNavItem key={i}
                                                     activeClassName="bg-primary-800 text-white! hover:bg-primary-800"
                                                     icon={item.icon}
                                                     className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-600! hover:bg-primary-100"
                                                     href={['/', language, item.link].join('')}>
                                {t(item.translation)}
                            </DashboardNavItem>
                        })
                    }
                </div>
                <div className="text-black w-full">
                    {children}
                </div>
            </div>
        </div>
    </div>
}