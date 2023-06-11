import Header from "@/modules/header";
import useNonExistProtection from "@/hooks/useNonExistProtection";
import {Container} from "@mui/material";
import Trips from "@/modules/trip";

// @ts-ignore
export default function TripsPage({trips}) {
    const res = useNonExistProtection();
    if(res)
        return res;

    return (<>
        <Header />
        <Container maxWidth={"md"}>
            <Trips trips={trips}/>
        </Container>
    </>)
}

// @ts-ignore
export async function getServerSideProps(context){
    try {
        const {req} = context;
        const token: string = req.cookies.token;
        const response = await fetch('http://localhost:5199/api/routes',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            });
        const data = await response.json();
        return {
            props: {
                trips: data,
            },
        };
    } catch (error) {
        throw error;
    }
}