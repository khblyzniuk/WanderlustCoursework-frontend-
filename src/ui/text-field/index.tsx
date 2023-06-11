import theme from "@/helpers/theme";
import {styled} from "@mui/styles";
import TextField from "@mui/material/TextField";

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
export default function TextFieldUI({id, label, name,
// @ts-ignore
                                        autoComplete, autoFocus, error,
// @ts-ignore
                                        type, defaultValue}) {

    return <CssTextField
        margin="normal"
        error={!(error === null || error === undefined)}
        required
        fullWidth
        id={id}
        label={label}
        name={name}
        type={type}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        color={"primary"}
        sx={{input: {color: theme.palette.primary.main}}}
    />
}