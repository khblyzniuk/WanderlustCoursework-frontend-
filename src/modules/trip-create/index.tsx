import useTokenCookies from "@/hooks/useTokenCookies";
import {useRouter} from "next/router";
import {FormEvent, useState} from "react";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import TextFieldUI from "@/ui/text-field";
import ErrorText from "@/ui/error-text";
import RegisterButton from "@/ui/submit-button";

export default function TripCreate(){
    const [{token}, setCookie, removeCookie] = useTokenCookies();
    const router = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dataForm = new FormData(event.currentTarget);
        const data = {
            name: dataForm.get("name"),
            description: dataForm.get("description"),
            startDate: dataForm.get("startDate"),
            endDate: dataForm.get("endDate")
        };

        const res = await fetch("http://localhost:5199/api/routes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        }).then(data => data.json())

        if (res.error) {
            setError(res.error);
            return;
        }

        setError(undefined);

        await router.replace("/trips");
    };

    const [error, setError] = useState<string>();

    return <Container maxWidth={"md"}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextFieldUI
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                error={error}
            />
            <TextFieldUI
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                error={error}
            />
            <TextFieldUI
                id="startDate"
                label="Start Date: yyyy-mm-dd"
                name="startDate"
                autoComplete="startDate"
                error={error}
            />
            <TextFieldUI
                id="endDate"
                label="End Date: yyyy-mm-dd"
                name="endDate"
                autoComplete="endDate"
                autoFocus
                error={error}
            />
            <ErrorText error={error}/>
            <RegisterButton text={"Create new trip"}/>
        </Box>
    </Container>
}