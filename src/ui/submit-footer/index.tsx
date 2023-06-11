import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import theme from "@/helpers/theme";

// @ts-ignore
export default function Footer({text, to}){
    return <Grid container justifyContent={"center"}>
        <Grid item>
            <Link href={to} variant="body2">
                <Box sx={{"&:hover":{color: theme.palette.secondary.dark}}}>{text}</Box>
            </Link>
        </Grid>
    </Grid>;
}