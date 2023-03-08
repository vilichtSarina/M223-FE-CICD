import {Button, Typography} from "@mui/material";
import "./ErrorPage.css"

export default function Unauthorized() {



    return (
        <div className={"unauthorized"}>
            <Typography color={"aqua"} className={"typo"} variant={"h4"}>Oops wrong Site...</Typography>
            <Button variant={"contained"} color={"warning"} href={"/home"} >Return to Home</Button>
        </div>
    );
}
