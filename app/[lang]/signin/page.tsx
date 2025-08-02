import Authentication from "@/layouts/Authentication";
import SignInForm from "@/components/SignInForm";
import Link from "next/link";
import {useServerLocale} from "@/composables/useServerLocale";
import {cookies} from "next/headers";

export default async function SignIn() {

    const {t} = await useServerLocale(await cookies());

    return <Authentication>
        <div className="flex items-center justify-center w-full h-full">
            <div
                className="w-full max-w-md bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
                <div className="text-2xl text-center font-bold text-white">{t('signin.title')}</div>
                <div className="text-center mb-8 text-md text-white/80"></div>
                <SignInForm/>
                <div className="mt-6 flex flex-col items-center">
                    <div className="text-center text-md text-white/80">Don't have an account?</div>
                    <Link className="text-center text-white text-sm font-bold" href="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    </Authentication>
}