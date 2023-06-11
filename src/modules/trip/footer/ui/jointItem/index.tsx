import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {Box} from "@mui/system";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useTokenCookies from "@/hooks/useTokenCookies";

// @ts-ignore
export default function JointItem({joint, index, setJoints}) {
    const [{token}] = useTokenCookies();
    const [name, setName] = useState();

    useEffect(() => {
        if(joint)
        fetch('http://localhost:5199/api/tourist-place/' + joint.touristPlaceId)
            .then(res => res.json())
            .then(data => setName(data.name));
    }, [joint])

    // @ts-ignore
    const handleDelete = async () => {
        await fetch('http://localhost:5199/api/routes/' + joint.routeId + '/joints/' + joint.id,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            })
        await fetch(`http://localhost:5199/api/routes/${joint.routeId}/joints`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                "Authorization": "Bearer " + token
            },
        })
            .then(res => res.json())
            .then(data => setJoints(data))
    }

    return <Box display={"flex"} justifyContent={"space-between"} alignItems={"start"}>
        <Typography mt={0.8}>{index}: {name}</Typography>
        <Box>
            <Button onClick={() => handleDelete()}>
                <DeleteOutlineOutlinedIcon/>
            </Button>
        </Box>
    </Box>
}