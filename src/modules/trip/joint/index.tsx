import {FormEvent} from "react";
import TextFieldUI from "@/ui/text-field";
import {Box} from "@mui/system";
import useTokenCookies from "@/hooks/useTokenCookies";
import SubmitButton from "@/ui/submit-button";

// @ts-ignore
export default function Joint({trip, joints, setJoints}) {
    const [{token}] = useTokenCookies();

    // @ts-ignore
    const handleCreateJoint = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dataForm = new FormData(event.currentTarget);
        let data = {
            joint: dataForm.get("joint"),
            touristPlaceId: null,
            routeId: trip.id,
            sequence: joints.length + 1,
            visitDate: dataForm.get("visitDate")
        };

        try {
            const res = await fetch('http://localhost:5199/api/tourist-place');
            const places = await res.json();
            // @ts-ignore
            if (places.some(p => p.name === data.joint)) {
                // @ts-ignore
                const tp = places.find(p => p.name === data.joint);
                data['touristPlaceId'] = tp.id;
            } else {
                console.log("There is no tourist places with this name!")
            }
        } catch (error) {
            // @ts-ignore
            throw new Error(error)
        }

        await fetch(`http://localhost:5199/api/routes/${data.routeId}/joints?touristPlaceId=${data.touristPlaceId}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    sequence: data.sequence,
                    visitDate: data.visitDate
                })
            }).then(res => res.json())
        // @ts-ignore
        const newJoints = await fetch(`http://localhost:5199/api/routes/${data.routeId}/joints`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                "Authorization": "Bearer " + token
            },
        })
            .then(res => res.json())

        setJoints(newJoints)
    };

    return <Box component={"form"}
                onSubmit={(event: FormEvent<HTMLFormElement>) => handleCreateJoint(event)}>
        {/*// @ts-ignore*/}
        <TextFieldUI
            autoComplete={"joint"}
            name={"joint"}
            id={"joint"}
            label={"Enter tourist place here:"}
        />
        {/*// @ts-ignore*/}
        <TextFieldUI
            autoComplete={"visitDate"}
            name={"visitDate"}
            id={"visitDate"}
            label={"Enter visit date here:"}
        />
        <SubmitButton text={"Submit"}/>
    </Box>
}