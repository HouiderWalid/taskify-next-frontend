'use client'

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormAlertMessage from "@/components/FormAlertMessage";
import TextField from "@/components/io/TextField";
import Button from "@/components/io/Button";
import {useState} from "react";
import {useSyncFetchData} from "@/composables/useFetchedData";
import {useSignUpApi} from "@/assets/ts/api/AuthenticationApis";
import AuthData from "@/assets/ts/models/AuthData";
import {setToken, setUser} from "@/store/userStore";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

export default function SignUpForm() {

    const schema = z.object({
        full_name: z.string().min(3, "The Full Name must be at least 3 characters."),
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        password_confirmation: z.string().min(8, "Password must be at least 8 characters")
    }).refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ["password_confirmation"]
    });

    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<object[]>([])
    const [alertStatus, setAlertStatus] = useState<'warning' | 'success' | 'error'>('success');
    const [alertMessage, setAlertMessage] = useState('');
    const fullNameServerError = serverErrors.filter((serverError: {
        path?: string
    }) => serverError?.path === "full_name")
    const emailServerError = serverErrors.filter((serverError: { path?: string }) => serverError?.path === "email")
    const passwordServerError = serverErrors.filter((serverError: {
        path?: string
    }) => serverError?.path === "password")
    const passwordConfirmationServerError = serverErrors.filter((serverError: {
        path?: string
    }) => serverError?.path === "password_confirmation")

    const dispatch = useDispatch();
    const router = useRouter();

    function onSubmit(formData: FormData) {
        useSyncFetchData(useSignUpApi(formData))
            .onStart(() => {
                setLoading(true)
                setAlertMessage('')
            })
            .onValidationErrors((error: any[]) => setServerErrors(error))
            .onSuccess((authData: AuthData) => {
                dispatch(setUser(authData.getUser()))
                dispatch(setToken(authData.getAccessToken()))
                router.push("/");
            }, AuthData)
            .onFailure((message: any) => {
                setAlertStatus('error')
                setAlertMessage(message)
            })
            .onFinished(() => setLoading(false))
    }

    return <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <FormAlertMessage type={alertStatus} message={alertMessage} open={!!alertMessage}
                          onCloseAction={() => setAlertMessage('')}/>
        <div className="flex flex-col">
            <TextField id="full_name" name="full_name" registerAction={register} label="Full Name" theme="blurry"
                       placeholder="Enter your full name"
                       errorMessages={[errors.full_name?.message ?? fullNameServerError[0]]}/>
            <TextField id="email" name="email" registerAction={register} label="Email" theme="blurry"
                       placeholder="Enter your email" errorMessages={[errors.email?.message ?? emailServerError[0]]}/>
            <TextField id="password" name="password" registerAction={register} type="password" label="Password"
                       theme="blurry" placeholder="Enter your password"
                       errorMessages={[errors.password?.message ?? passwordServerError[0]]}/>
            <TextField id="password_confirmation" name="password_confirmation" registerAction={register} type="password"
                       label="Password Confirmation"
                       theme="blurry" placeholder="Enter your password confirmation"
                       errorMessages={[errors.password_confirmation?.message ?? passwordConfirmationServerError[0]]}/>
        </div>
        <Button variant="filled-reversed" type="submit" loading={loading}>Sign In</Button>
    </form>

}