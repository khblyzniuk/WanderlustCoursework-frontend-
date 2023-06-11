import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import theme from "@/helpers/theme";
import RegisterButton from "src/ui/register-button";
import Link from "next/link";
import useToken from "@/hooks/useToken";

export default function HomeScreen(){
    const token = useToken();

    return <Box sx={{mt: 10}}>
        <Typography variant={"h1"} color={theme.palette.primary.main}
                    sx={
                        {
                            textTransform: "uppercase",
                            fontWeight: 700,
                            textAlign: "center"
                        }
                    }>Wanderlust</Typography>
        <Typography variant={"h2"} color={theme.palette.primary.main}
                    sx={
                        {
                            mt: 10,
                            textTransform: "uppercase",
                            fontWeight: 700,
                            textAlign: "center"
                        }
                    }>Find Your Next Unforgettable Journey!</Typography>
        <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} mt={10}>
            {!token && <RegisterButton/>}
            <Link href={"/tourist-places"}>
                {"Show tourist places >>>"}
            </Link>
        </Box>
    </Box>
}