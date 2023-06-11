import theme from "@/helpers/theme";
import Typography from "@mui/material/Typography";

export default function ErrorText(props:any){
    const {error} = props;

    return <Typography color={theme.palette.error.main} textAlign={"center"}>{error}</Typography>;
}