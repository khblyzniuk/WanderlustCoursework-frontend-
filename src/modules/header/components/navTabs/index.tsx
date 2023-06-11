import Link from "next/link";
import {Tab, Tabs} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {makeStyles} from "@mui/styles";
import useToken from "@/hooks/useToken";

const useStyles = makeStyles({
    tabs: {
        width: "40%",
        marginRight: "auto",
        marginLeft: "1rem"
    },
    tab: {
        width: "33% !important",
        color: "#fff !important",
        cursor: "pointer",
    },
    tabLink: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    }
})

export default function NavTabs() {
    const token = useToken();
    const classes = useStyles()
    const [value, setValue] = useState(0);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return <Tabs variant={"fullWidth"} value={(!token) ? 0 : value} onChange={handleChange} className={classes.tabs}>
        <Tab label={<Link href={"/"}><div className={classes.tabLink}>Home</div></Link>} value={0} className={classes.tab}/>
        <Tab label={<Link href={"/tourist-places"}><div className={classes.tabLink}>Tourist Places</div></Link>} value={1} className={classes.tab}/>
        {token && <Tab label={<Link href={"/trips"}><div className={classes.tabLink}>Trips</div></Link>} value={2} className={classes.tab}/>}
        {token && token.role === "Admin" && <Tab label={<Link href={"/users"}><div className={classes.tabLink}>Users</div></Link>} value={3} className={classes.tab}/>}
    </Tabs>
}