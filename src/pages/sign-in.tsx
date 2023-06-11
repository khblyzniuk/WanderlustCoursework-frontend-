import SignIn from "@/modules/sign-in";
import useProtection from "@/hooks/useProtection";
import Header from "@/modules/header";

export default function SignInPage() {
    const res = useProtection();
    if (res)
        return res;

    return <>
        <Header/>
        <SignIn/>
    </>;
}
