import { Box } from "@mui/system";
import logo from "../../logo1.png";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box className={"box"}>
      <h1 className={"space"}>ARSON</h1>
      <div className="textSign">
        <p>and other crimes we support </p>
        <hr />
      </div>

      <button className={"loginButton"} onClick={() => navigate("/login")}>LOGIN</button>
      <iframe
        src="https://i.redd.it/g61r1687wkd91.gif"
        frameBorder="0"
        width="100%"
        height="100%"
        title="logo"
      ></iframe>
      <img src={logo} className="App-logo img" alt="logo" />
    </Box>
  );
}
