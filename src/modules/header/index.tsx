import {AppBar, Container, IconButton, Toolbar} from "@mui/material";
import Logo from "@/modules/header/components/logo";
import NavTabs from "@/modules/header/components/navTabs";
import SignIn from "src/modules/header/components/sign-in";
import SignOut from "@/modules/header/components/sign-out";
import useToken from "@/hooks/useToken";
import RegisterButton from "src/ui/register-button";
import Link from "next/link";
import Person from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";

export default function Header() {
    const token = useToken();

    return (
        <AppBar position={"static"}>
            {token?.role === "Admin" && <Typography position={"absolute"}>Admin</Typography>}
            <Container maxWidth={"xl"}>
                <Toolbar disableGutters>
                    <Logo />
                    <NavTabs/>
                    {!token && <RegisterButton/>}
                    {!token ? <SignIn/> : <SignOut/>}
                    {token && <IconButton>
                        <Link href={"/profile"}>
                            <Person fontSize={"large"}></Person>
                        </Link>
                    </IconButton>}
                </Toolbar>
            </Container>
        </AppBar>
    )
}
