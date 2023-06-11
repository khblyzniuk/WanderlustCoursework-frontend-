import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import Link from "next/link";

export default function Logo(){
    return <Box>
        <Link href={"/"}>
            <Typography variant={"h2"} sx={{cursor: "pointer"}}>
                WanderlustUA
            </Typography>
        </Link>
    </Box>
}