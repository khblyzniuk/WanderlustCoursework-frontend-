import Register from "@/modules/register";
import useProtection from "@/hooks/useProtection";
import Header from "@/modules/header";

export default function RegisterPage() {
    const res = useProtection();
    if (res)
        return res;

    return <>
        <Header/>
        <Register/>
    </>
}