import {Button, Typography} from "@mui/material";
import Link from "next/link";

export default function RegisterButton(){
    return <Button variant="outlined" color={"secondary"} sx={{marginRight: "1rem"}}>
        <Link href={"/register"}>
            <Typography variant={"h4"} sx={{cursor: "pointer"}}>Register</Typography>
        </Link>
    </Button>
}