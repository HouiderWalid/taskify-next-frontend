import Authentication from "@/layouts/Authentication";
import SignInForm from "@/components/SignInForm";

async function handleSubmit() {

}

export default async function SignIn() {

    return <Authentication>
        <div className="flex items-center justify-center w-full h-full">
            <div
                className="w-full max-w-md bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
                <div className="text-2xl text-center font-bold text-white"></div>
                <div className="text-center mb-8 text-md text-white/80"></div>
                <SignInForm />
            </div>
        </div>
    </Authentication>
}