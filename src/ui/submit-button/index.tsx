import Button from "@mui/material/Button";

// @ts-ignore
export default function SubmitButton({text}){
    return <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
    >
        {text}
    </Button>;
}