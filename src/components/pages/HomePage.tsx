import { Box } from "@mui/system";
import logo from "../../logo1.png";
import "./HomePage.css";
import {useNavigate} from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

  return (
    <Box className={"box"}>
      <h1 className={"our"}>OUR</h1>
      <h1 className={"space"}>SPACE</h1>
      <div className="textSign">
        <p>PROJECT FOR UK223 </p>
        <hr />
      </div>

      <button className={"loginButton"} onClick={() => navigate("/login") }>LOGIN</button>
        <iframe
            src="https://my.spline.design/clonercubesimplecopy-4e798f67900aa80d96268be736aaddc2/"
            frameBorder="0"
            width="100%"
            height="100%"
            title="logo"
        ></iframe>
        <img src={logo} className="App-logo img" alt="logo" />
    </Box>
  );
}
