import { FcGoogle } from 'react-icons/fc';
import { signIn } from "next-auth/react";

export default function Login() {

    return (
        <div className="h-screen flex justify-center items-center">
            <div>
                <p className="text-2xl mb-2">Welcome!</p>
                <div className="flex">
                    <p>Login with your Google account:</p>
                    <FcGoogle size={25} className="mx-2" onClick={() => signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL})}/>
                </div>               
            </div>
        </div>
    )
}