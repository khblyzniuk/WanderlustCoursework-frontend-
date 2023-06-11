import {Button, Typography} from "@mui/material";
import {useRouter} from "next/router";
import useTokenCookies from "@/hooks/useTokenCookies";

export default function SignOut(){
    const router = useRouter();
    // @ts-ignore
    const [cookies, setCookies ,removeCookies] = useTokenCookies();
    // @ts-ignore
    const handleClick = async (event) => {
        event.preventDefault();

        removeCookies("token");

        await router.replace("/")
    }

    return <Button variant="contained" color={"secondary"} onClick={handleClick}>
        <Typography variant={"h4"} sx={{cursor: "pointer"}}>Sign Out</Typography>
    </Button>
}