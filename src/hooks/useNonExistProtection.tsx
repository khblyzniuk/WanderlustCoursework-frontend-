import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import useToken from "@/hooks/useToken";

export default function useNonExistProtection() {
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();
    const token = useToken();

    useEffect(() => {
        if (!token) {
            router.replace("/");
            return;
        }
        setLoading(false);
    }, [router, token]);

    return isLoading;
}