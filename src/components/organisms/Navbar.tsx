import "../components.css"
import {AppBar, IconButton, Toolbar, Typography, Box, Button} from "@mui/material";
import { LogoutOutlined} from "@mui/icons-material";
import {useContext} from "react";
import ActiveUserContext from "../../Contexts/ActiveUserContext";
import navbarImage from "../assets/LogoOurSpace.png"
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const activeUserContext = useContext(ActiveUserContext);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar >
                    <Toolbar>
                        <IconButton
                            disabled
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, width: "2vw", height: "2vw" }}
                        >
                            <img style={{width: "2vw", scale: "700%"}} src={navbarImage} alt=""/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            OurSpace
                        </Typography>

                        {   activeUserContext.isAdmin() &&
                            <Button
                            id={"logout"}
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="false"
                            color="inherit"
                            onClick={() => navigate("/users/all")}
                        >
                            User Overview
                        </Button>
                        }
                        <IconButton
                            id={"logout"}
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="false"
                            color="inherit"
                            onClick={activeUserContext.logout}
                        >
                            <LogoutOutlined />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
