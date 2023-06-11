import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {useRouter} from "next/router";
import {makeStyles} from "@mui/styles";
import useTokenCookies from "@/hooks/useTokenCookies";
import Footer from "@/modules/trip/footer";
import {useState} from "react";

const useStyles = makeStyles({
    items: {
        width: "60%"
    },
    item: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        border: "3px solid #000",
        borderRadius: "7px",
        marginBottom: 10,
    },
    itemTitle: {
        alignSelf: "center"
    },
    itemDescription: {
        alignSelf: "self-start"
    }
})

// @ts-ignore
export default function Trips({trips}) {
    const [tripsCopy, setTrips] = useState(trips);
    const [{token}] = useTokenCookies();
    const classes = useStyles();
    const router = useRouter();
    const handleCreateClick = async () => {
        await router.push("/trips/create")
    }

    // @ts-ignore
    const handleDeleteTrip = async (trip) => {
        await fetch("http://localhost:5199/api/routes/" + trip.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })

        const trips = await fetch('http://localhost:5199/api/routes',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            }).then(res => res.json());

        if (trips.error) {
            throw new Error(trips.error)
        }

        setTrips(trips);
    }

    return !trips || trips.length === 0 ?
        <Box height={"75vh"} display={"flex"} flexDirection={"row"}
             alignItems={"center"} justifyContent={"center"} alignSelf={"center"}
        >
            <Typography variant={"h2"} align={"center"}>Want to create a trip? {'->'} </Typography>
            <Button color={"secondary"} onClick={handleCreateClick}>
                <AddCircleOutlineOutlinedIcon fontSize={"large"}/>
            </Button>
        </Box>
        :
        <Box sx={{display: "flex", alignItems: "center", alignSelf: "center", flexDirection: "column", mt: 7}}>
            <List className={classes.items}>
                {/*@ts-ignore*/}
                {tripsCopy?.map(trip =>
                    <ListItem key={trip.id} className={classes.item}>
                        <Typography variant={"h2"} fontWeight={700}
                                    className={classes.itemTitle}>{trip.name}</Typography>
                        <Typography variant={"inherit"}
                                    className={classes.itemDescription}>{trip.description}</Typography>
                        <Typography variant={"h3"} mt={2} mb={2}>TIME FRAME</Typography>
                        <Footer trip={trip} handleDeleteTrip={handleDeleteTrip}/>
                    </ListItem>
                )}
            </List>
            <Button color={"secondary"} onClick={handleCreateClick}>
                <AddCircleOutlineOutlinedIcon fontSize={"large"}/>
            </Button>
        </Box>;
}