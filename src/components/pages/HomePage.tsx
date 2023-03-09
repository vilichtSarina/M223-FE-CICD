import { Box } from "@mui/system";
import logo from "../../logo1.png";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box className={"box"}>
      <h1 className={"our"}>CAT EAT</h1>
      <h1 className={"space"}>SOLID MILK</h1>
      <div className="textSign">
        <p>PROJECT FOR UK223 </p>
        <hr />
      </div>

      <button className={"loginButton"} onClick={() => navigate("/login")}>LOGIN</button>
      <center>
        <iframe
          src="https://i.redd.it/g61r1687wkd91.gif"
          frameBorder="0"
          width="100%"
          height="100%"
          title="logo"
        ></iframe>
      </center>
      <img src={logo} className="App-logo img" alt="logo" />
    </Box>
  );
}
