import {NextRequest, NextResponse} from "next/server";
import {match} from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import {useFetchedData} from "@/composables/useFetchedData";
import {useAuthUserApi} from "./assets/ts/api/AuthenticationApis";
import User from "@/assets/ts/models/User";
import {store} from "@/store/store";
import {getAuthUser, getToken, setUser} from "@/store/userStore";
import DashboardRoutes from "@/assets/ts/other/DashboardRoutes";
import GuestRoutes from "@/assets/ts/other/GuestRoutes";
import Permission from "@/assets/ts/models/permission/Permission";
import {STORAGE_PERSISTENCE_KEY as LOCALE_STORAGE_KEY} from "@/store/localeStore";

let locales = ['en', 'ar', 'fr']

const PAGE_PERMISSION_MAP: Record<string, string> = {
    '/': Permission.VIEW_OVERVIEW,
    '/users': Permission.VIEW_USERS,
    '/projects': Permission.VIEW_PROJECTS,
    '/tasks': Permission.VIEW_TASKS,
    '/settings': Permission.VIEW_SETTINGS
}

function getLocale(request: NextRequest) {

    const defaultLocale = 'en'
    let languages: Array<string> = []
    try {
        const locale = JSON.parse(request.cookies.get(encodeURIComponent(LOCALE_STORAGE_KEY))?.value ?? '')
        languages = [String(locale?.locale).replace(/^"|"$/g, '')]
    } catch (e) {

    }

    if (!languages.length) {
        let headers = {'accept-language': 'en-US,en;q=0.5'}
        languages = new Negotiator({headers}).languages()
    }

    return match(languages, locales, defaultLocale)
}

export default async function (request: NextRequest) {
    const localResponse = localeCheck(request)
    if (localResponse instanceof NextResponse) {
        return localResponse
    }

    const response = saveLocale(request)

    const authResponse = await checkAuth(request)
    if (authResponse instanceof NextResponse) {
        return authResponse
    }

    return response
}

async function checkAuth(request: NextRequest) {
    let user: User | null = getAuthUser(store.getState(), request);
    const token = getToken(store.getState(), request)
    let pathname = request.nextUrl.pathname

    if (token && !(user instanceof User)) {

        try {
            const {data} = await useFetchedData(useAuthUserApi(request))
            if (data instanceof User) {
                user = data
                store.dispatch(setUser(data))
            }
        } catch (e) {
        }
    }

    let noLocalPathname = String(pathname).replace(/^\/(en|ar)/, '')
    noLocalPathname = noLocalPathname ? noLocalPathname : '/'

    const locale = getLocale(request)

    if (DashboardRoutes.getAllRoutesPaths().includes(String(noLocalPathname)) && !(user instanceof User)) {
        request.nextUrl.pathname = ['/', locale, GuestRoutes.SIGNIN.PATH].join('')
    }

    const routePermission = PAGE_PERMISSION_MAP[noLocalPathname]
    if (routePermission && user instanceof User && !user?.isPermitted(routePermission)) {
        request.nextUrl.pathname = ['/', locale, DashboardRoutes.NOT_PERMITTED.PATH].join('')
    }

    if (GuestRoutes.getAllRoutesPaths().includes(String(noLocalPathname)) && user instanceof User) {
        request.nextUrl.pathname = ['/', locale, DashboardRoutes.OVERVIEW.PATH].join('')
    }

    if ([noLocalPathname, pathname].includes(request.nextUrl.pathname)) {
        return NextResponse.next()
    }

    return NextResponse.redirect(request.nextUrl)
}

function saveLocale(request: NextRequest) {
    const locale = request.nextUrl.pathname.split('/').at(1)
    const response = NextResponse.next()

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    response.cookies.set({
        name: encodeURIComponent(LOCALE_STORAGE_KEY),
        value: JSON.stringify({locale: JSON.stringify(locale)}),
        expires,
        httpOnly: false,
        sameSite: 'lax',
    })

    return response
}

function localeCheck(request: NextRequest) {

    const {pathname} = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) {
        return
    }

    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        '/((?!_next).*)'
    ]
}