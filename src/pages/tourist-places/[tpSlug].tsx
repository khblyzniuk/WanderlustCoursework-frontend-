import {useRouter} from "next/router";
import Header from "@/modules/header";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import Image from "next/image";
import Typography from "@mui/material/Typography";

export default function TouristPlacePage(){
    const router = useRouter()
    // @ts-ignore
    const tpId = (router.query.tpSlug?.toString().split(':')[1]?.replaceAll('"', '') ?? '');

    const [place, setPlace] = useState();

    useEffect(()=>{
        fetch("http://localhost:5199/api/tourist-place/" + tpId)
            .then(res => res.json())
            .then(data => setPlace(data))
    },[]);

    if(!place){
        return <>
            <Header/>
            <p>Loading...</p>
        </>
    }

    return <>
        <Header/>
        <Container component="main" maxWidth="md" sx={
            {
                mt: 6,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column"
            }
        }>
            <Box alignSelf={"center"}>
                <Image src={"https://source.unsplash.com/500x500/?river"}
                       alt={"tourist-place"} width={500} height={500}/>
            </Box>
            {/*// @ts-ignore*/}
            <Typography textAlign={"center"} variant={"h3"} fontWeight={700} fontSize={42} mb={5}>{place.name}</Typography>
            {/*// @ts-ignore*/}
            <Typography fontSize={24}>Description: {place.description}</Typography>
            {/*// @ts-ignore*/}
            <Typography fontSize={24}>Region: {place.region}</Typography>
            {/*// @ts-ignore*/}
            <Typography fontSize={24}>Category: {place.category}</Typography>
        </Container>
    </>
}