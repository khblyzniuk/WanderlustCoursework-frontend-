import useNonExistProtection from "@/hooks/useNonExistProtection";
import Profile from "@/modules/profile";
import decryptToken from "@/helpers/decryptToken";
import Header from "@/modules/header";

// @ts-ignore
export default function ProfilePage({data: user}) {
    const isLoading = useNonExistProtection();
    if (isLoading) {
        return <p>Loading...</p>;
    }

    return <>
        <Header/>
        <Profile user={user}/>
    </>
}

// @ts-ignore
export async function getServerSideProps(context) {
    try {
        const {req} = context;
        const token: string = req.cookies.token;
        const userId = decryptToken(token).userId;
        const response = await fetch('http://localhost:5199/api/users/' + userId.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        })
        const data = await response.json();
        return {
            props: {
                data,
            },
        };
    } catch (error) {
        throw error;
    }
}
