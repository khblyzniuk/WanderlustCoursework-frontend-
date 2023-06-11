import TextFieldUI from "@/ui/text-field";
import theme from "@/helpers/theme";

export default function EditField(props:any){
    const {id, label, name, autoComplete, autoFocus, error, type, defaultValue} = props;

    return <TextFieldUI
        margin="normal"
        error={error}
        required
        fullWidth
        id={id}
        label={label}
        name={name}
        defaultValue={defaultValue}
        type={type}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        color={"primary"}
        sx={{ input: { color: theme.palette.primary.main } }}
    />
}