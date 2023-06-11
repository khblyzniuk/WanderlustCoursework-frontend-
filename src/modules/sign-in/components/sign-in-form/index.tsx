import Box from "@mui/material/Box";
import {FormEvent, useState} from "react";
import useTokenCookies from "@/hooks/useTokenCookies";
import SignInTextField from "src/ui/text-field";
import ErrorText from "src/ui/error-text";
import SignInButton from "src/ui/submit-button";
import Footer from "src/ui/submit-footer";
import {useRouter} from "next/router";

export default function SignInForm(){
    const [cookies, setCookie, removeCookie] = useTokenCookies();
    const router = useRouter();
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dataForm = new FormData(event.currentTarget);
        const data = {
            email: dataForm.get("email"),
            password: dataForm.get("password"),
        };

        const res = await fetch("http://localhost:5199/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(data => data.json())

        if(res.error){
            setError(res.error);
            return;
        }

        setError(undefined);

        setCookie('token', res.token, {
            path: "/",
            sameSite: "none",
            secure: true
        })

        await router.push("/");
    };

    const [error, setError] = useState<string>();

    return <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {/*// @ts-ignore*/}
        <SignInTextField
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={error}
        />
        {/*// @ts-ignore*/}
        <SignInTextField
            id="password"
            label="Password"
            name="password"
            autoComplete="current-password"
            error={error}
            type={"password"}
        />
        <ErrorText error={error}/>
        <SignInButton text={"Sign In"}/>
        <Footer text={"\"Don't have an account? Sign Up\""} to={"/register"}/>
    </Box>
}