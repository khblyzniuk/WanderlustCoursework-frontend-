import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Joint from "@/modules/trip/joint";
import {useEffect, useState} from "react";
import useTokenCookies from "@/hooks/useTokenCookies";
import JointItem from "@/modules/trip/footer/ui/jointItem";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import * as React from "react";
import {styled} from "@mui/styles";
import theme from "@/helpers/theme";

interface Mark {
    value: number;
    label?: React.ReactNode;
}

const StyledSlider = styled(Slider)({
    "&.Mui-disabled": {
        color: theme.palette.secondary.main
    },
    "& .MuiSlider-mark": {
        width: "2px",
        height: "10px",
        backgroundColor: "#000"
    },
    "& .MuiSlider-markLabel": {
        top: "18px",
        color: "#000"
    }
})

// @ts-ignore
export default function Footer({trip, handleDeleteTrip}) {
    const [showJoint, setShowJoint] = useState(false);
    const [{token}] = useTokenCookies();
    const [joints, setJoints] = useState<any[]>();

    useEffect(() => {
        fetch(`http://localhost:5199/api/routes/${trip.id}/joints`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                "Authorization": "Bearer " + token
            },
        })
            .then(res => res.json())
            .then(data => setJoints(data))
    }, [])

    joints?.sort((a, b) => {
        const dateA = new Date(a.visitDate);
        const dateB = new Date(b.visitDate);
        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        return 0;
    });

    if (!joints)
        return <p>Loading...</p>
    const handleShowJoint = () => {
        setShowJoint(p => !p)
    }

    const marks = joints.map((joint, ind) => {
        const startDate = new Date(trip.startDate);
        const endDate = new Date(trip.endDate);
        const now = new Date(joint.visitDate);

        const totalTime = endDate.getTime() - startDate.getTime();
        const elapsedTime = now.getTime() - startDate.getTime();

        return {
            value: elapsedTime > 0 ? (elapsedTime / totalTime) * 1000 : 0,
            label: (ind+1).toString()
        } as Mark;
    })

    // @ts-ignore
    const getCurrentPercentageOfTrip = (trip) => {
        const startDate = new Date(trip.startDate);
        const endDate = new Date(trip.endDate);
        const now = new Date();

        const totalTime = endDate.getTime() - startDate.getTime();
        const elapsedTime = now.getTime() - startDate.getTime();

        return elapsedTime > 0 ? (elapsedTime / totalTime) * 1000 : 0;
    }
    console.log(marks)
    return <> <Box display={"flex"} justifyContent={"space-between"} flexDirection={"row"}>
        <Typography alignSelf={"center"}>{trip.startDate.toString().split("T")[0]}</Typography>
        <StyledSlider disabled defaultValue={getCurrentPercentageOfTrip(trip)}
                aria-label="Disabled slider" min={0} max={1000} marks={marks}
                sx={{width: 200, margin: "0 1.4rem 0 1.4rem"}}
        color={"secondary"}/>
        <Typography alignSelf={"center"}>{trip.endDate.toString().split("T")[0]}</Typography>
    </Box>
        {new Date() >= new Date(trip.endDate) &&
            <Typography sx={{color: "green"}}>Completed!</Typography>}
        <Box display={"flex"} mt={3}>
            <Button color={"secondary"} onClick={handleShowJoint}>
                <AddCircleOutlineOutlinedIcon fontSize={"medium"}/>
            </Button>
            <Button onClick={() => handleDeleteTrip(trip)}><DeleteOutlineOutlinedIcon/></Button>
        </Box>
        {joints.map((joint, index) => {
            return <JointItem key={index} joint={joint} index={index + 1}
                              setJoints={setJoints}/>

        })}
        {showJoint && <Joint trip={trip} joints={joints} setJoints={setJoints}/>}
    </>
}