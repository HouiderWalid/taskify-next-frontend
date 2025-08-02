import Authentication from "@/layouts/Authentication";
import Link from "next/link";
import SignUpForm from "@/components/SignUpForm";

export default function SignUp() {
    return <Authentication>
        <div className="flex items-center justify-center w-full h-full">
            <div
                className="w-full max-w-md bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
                <div className="text-2xl text-center font-bold text-white">Join Taskify</div>
                <div className="text-center mb-8 text-md text-white/80">Create an account to get started</div>
                <SignUpForm />
                <div className="mt-6 flex flex-col items-center">
                    <div className="text-center text-md text-white/80">Already have an account?</div>
                    <Link className="text-center text-white text-sm font-bold" href="/signin">Sign in</Link>
                </div>
            </div>
        </div>
    </Authentication>
}