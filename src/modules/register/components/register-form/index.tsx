import useTokenCookies from "@/hooks/useTokenCookies";
import {useRouter} from "next/router";
import {FormEvent, useState} from "react";
import Box from "@mui/material/Box";
import TextFieldUI from "src/ui/text-field";
import ErrorText from "src/ui/error-text";
import RegisterButton from "src/ui/submit-button";
import Footer from "src/ui/submit-footer";

export default function RegisterForm(){
    const [cookies, setCookie, removeCookie] = useTokenCookies();
    const router = useRouter();
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dataForm = new FormData(event.currentTarget);
        const data = {
            username: dataForm.get("username"),
            firstName: dataForm.get("firstName"),
            lastName: dataForm.get("lastName"),
            email: dataForm.get("email"),
            password: dataForm.get("password"),
            passwordConfirm: dataForm.get("password-confirm")
        };

        const res = await fetch("http://localhost:5199/api/auth/register", {
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

        await router.push("/sign-in");
    };

    const [error, setError] = useState<string>();

    return <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {/*// @ts-ignore*/}
        <TextFieldUI
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            error={error}
        />
        {/*// @ts-ignore*/}
        <TextFieldUI
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            error={error}
        />
        {/*// @ts-ignore*/}
        <TextFieldUI
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            autoFocus
            error={error}
        />
        {/*// @ts-ignore*/}
        <TextFieldUI
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={error}
        />
        {/*// @ts-ignore*/}
        <TextFieldUI
            id="password"
            label="Password"
            name="password"
            autoComplete="current-password"
            error={error}
            type={"password"}
        />
        {/*// @ts-ignore*/}
        <TextFieldUI
            id="password-confirm"
            label="Confirm Your Password"
            name="password-confirm"
            autoComplete="password-confirm"
            error={error}
            type={"password"}
        />
        <ErrorText error={error}/>
        <RegisterButton text={"Register"}/>
        <Footer text={"\"Already has an account? Sign In\""} to={"/sign-in"}/>
    </Box>
}