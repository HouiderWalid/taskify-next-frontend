'use client'

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import TextField from "@/components/io/TextField";
import Button from "@/components/io/Button";
import {useSyncFetchData} from "@/composables/useFetchedData";
import {useSignInApi} from "@/assets/ts/api/AuthenticationApis";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {useRouter} from 'next/navigation';
import AuthData from "@/assets/ts/models/AuthData";
import {setToken, setUser} from "@/store/userStore";
import FormAlertMessage from "@/components/FormAlertMessage";

export default function SignInForm() {

    const schema = z.object({
        email: z.string().email("Invalid email"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
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
    const [alertStatus, setAlertStatus] = useState<'warning' | 'success' | 'error'>('success');
    const [alertMessage, setAlertMessage] = useState('');

    const dispatch = useDispatch();
    const router = useRouter();

    function onSubmit(formData: FormData) {
        useSyncFetchData(useSignInApi(formData))
            .onStart(() => {
                setLoading(true)
                setAlertMessage('')
            })
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
        <FormAlertMessage type={alertStatus} message={alertMessage} open={!!alertMessage} onCloseAction={() => setAlertMessage('')}/>
        <div className="flex flex-col">
            <TextField id="email" name="email" registerAction={register} label="Email" theme="blurry"
                       placeholder="Enter your email" errorMessages={[errors.email?.message]}/>
            <TextField id="password" name="password" registerAction={register} type="password" label="Password"
                       theme="blurry"
                       placeholder="Enter your password" errorMessages={[errors.password?.message]}/>
        </div>
        <Button variant="filled-reversed" type="submit" loading={loading}>Sign In</Button>
    </form>

}