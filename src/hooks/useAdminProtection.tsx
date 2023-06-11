import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import useToken from "@/hooks/useToken";

export default function useAdminProtection(){
    const [isLoading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const token = useToken();

    useEffect(() => {
        if(!token || token.role !== "Admin"){
            router.replace("/");
        }
        setLoading(false);
    }, [router])

    if(isLoading){
        return <p>Loading...</p>
    }
}