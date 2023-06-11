import useAdminProtection from "@/hooks/useAdminProtection";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../modules/admin"), { ssr: false });

export default function UsersPage(){
    const res = useAdminProtection();
    if(res)
        return res;

    return <App />
}