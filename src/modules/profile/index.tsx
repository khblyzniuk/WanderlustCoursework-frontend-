import Box from "@mui/material/Box";
import Title from "@/ui/submit-title";
import Container from "@mui/material/Container";
import ProfileForm from "@/modules/profile/components/profile-form";

// @ts-ignore
export default function Profile({user}) {
    return <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Title text={"Hello, " + user.username}/>
            <ProfileForm user={user}/>
        </Box>
    </Container>
}

