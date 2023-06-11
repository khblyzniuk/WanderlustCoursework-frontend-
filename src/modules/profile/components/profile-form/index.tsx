import useTokenCookies from "@/hooks/useTokenCookies";
import {useRouter} from "next/router";
import {FormEvent, useState} from "react";
import Box from "@mui/material/Box";
import ErrorText from "src/ui/error-text";
import ProfileUpdateButton from "src/ui/submit-button";
import EditField from "@/modules/profile/components/profile-form/components/edit-field";
import Typography from "@mui/material/Typography";
import useToken from "@/hooks/useToken";

// @ts-ignore
export default function ProfileForm({user}) {
    const [cookies] = useTokenCookies()
    const token = useToken()
    const [result, setResult] = useState<string>()
    const route = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dataForm = new FormData(event.currentTarget);
        const data = {
            username: dataForm.get("username"),
            firstName: dataForm.get("firstName"),
            lastName: dataForm.get("lastName"),
            email: dataForm.get("email")
        };

        const requiredFields = ["username", "firstName", "lastName", "email"];

        for (const fieldName of requiredFields) {
            // @ts-ignore
            if (!data[fieldName]) {
                setError(`Empty ${fieldName}!`);
                return;
            }
        }

        if (
            data.username === user.username &&
            data.firstName === user.firstName &&
            data.lastName === user.lastName &&
            data.email === user.email
        ) {
            setResult("Change something in the fields!");
            return;
        }

        try {
            await fetch("http://localhost:5199/api/users/" + token.userId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + cookies.token
                },
                body: JSON.stringify(data)
            })
        }
        catch (error) {
            // @ts-ignore
            setError(error.toString());
            return;
        }

        setError(undefined);
        setResult("Updated successfully!")
        route.reload();
    };

    const [error, setError] = useState<string>();

    return <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
        UserName:
        <EditField
            id="username"
            label={user.username}
            name="username"
            autoComplete="username"
            autoFocus
            defaultValue={user.username}
            error={error}
        />
        Email Address:
        <EditField
            id="email"
            label={user.email}
            name="email"
            autoComplete="email"
            defaultValue={user.email}
            autoFocus
            error={error}
        />
        First Name:
        <EditField
            id="firstName"
            label={user.firstName}
            name="firstName"
            autoComplete="firstName"
            defaultValue={user.firstName}
            autoFocus
            error={error}
        />
        Last Name:
        <EditField
            id="lastName"
            label={user.lastName}
            name="lastName"
            autoComplete="lastName"
            defaultValue={user.lastName}
            autoFocus
            error={error}
        />
        <ErrorText error={error}/>
        <ProfileUpdateButton text={"Update profile"}/>
        <Typography color={"green"}>{result}</Typography>
    </Box>
}