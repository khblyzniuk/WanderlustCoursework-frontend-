import Link from "next/link";
import {Button, Typography} from "@mui/material";

export default function SignIn(){
    return <Button variant="contained" color={"secondary"}>
        <Link href={"/sign-in"}>
            <Typography variant={"h4"} sx={{cursor: "pointer"}}>Sign In</Typography>
        </Link>
    </Button>
}