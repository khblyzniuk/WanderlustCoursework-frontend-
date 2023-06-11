import React, {useState} from 'react';
import {makeStyles, styled} from '@mui/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Container} from "@mui/material";
import {Box} from "@mui/system";
import theme from "@/helpers/theme";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Link from "next/link";

const useStyles = makeStyles(() => ({
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 100,
    },
    searchInput: {
        maxWidth: 500,
        marginRight: 20,
    },
    listItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        border: "1px solid #000",
        borderRadius: "5px",
        minHeight: "8rem",
        marginBottom: 15,
    },
    itemImage: {
        marginRight: 30
    }
}));

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: theme.palette.primary.main,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.light,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
});

// @ts-ignore
const TouristPlacesList = ({touristPlaces}) => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    const [places, setPlaces] = useState(touristPlaces);

    const handleSearch = async () => {
        const res = await fetch('http://localhost:5199/api/tourist-place/' + searchTerm);
        const filtered = await res.json();
        setPlaces(filtered);
    };

    return (<>
            <Container component="main" maxWidth="lg">
                <Box className={classes.searchContainer}>
                    <CssTextField
                        margin="normal"
                        required
                        id={"search"}
                        label={"Search"}
                        autoComplete={"seacrh"}
                        color={"primary"}
                        sx={{input: {color: theme.palette.primary.main}}}
                        onChange={e => {
                            setSearchTerm(e.target.value)
                        }}
                    />
                    <IconButton onClick={handleSearch} sx={{ml: 3}}>
                        <SearchIcon/>
                    </IconButton>
                </Box>
            </Container>
            <Container maxWidth={"sm"}>
                <List>
                    {places && places.length > 0 ? (
                        // @ts-ignore
                        places.map((place) => (
                            <ListItem key={place.id} className={classes.listItem}>
                                <Box sx={{display: "flex"}}>
                                    <Box className={classes.itemImage}>
                                        <Image src={"https://source.unsplash.com/100x100/?mountains"} alt={""} width={100} height={100}/>
                                    </Box>
                                    <Box>
                                        <Typography variant={"h4"}>{place.name}</Typography>
                                        <Typography>Region: {place.name}</Typography>
                                        <Typography>Category: {place.name}</Typography>
                                        <Typography>Description: {place.name}</Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Link href={"/tourist-places/"+place.name.toLowerCase().replace(" ", "-")
                                        +':"'+place.id+'"'}>
                                        <OpenInNewOutlinedIcon fontSize={"large"} cursor={"pointer"}/>
                                    </Link>
                                </Box>
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="No results found."/>
                        </ListItem>
                    )}
                </List>
            </Container>
        </>
    );
};

export default TouristPlacesList;
