import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Title from "src/ui/submit-title";
import SignInForm from "@/modules/sign-in/components/sign-in-form";

export default function SignIn() {
     return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Title text={"Sign In"}/>
                <SignInForm/>
            </Box>
        </Container>
    );
}
