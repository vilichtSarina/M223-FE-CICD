import { Box } from "@mui/system";
import logo from "../../logo1.png";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box className={"box"}>
      <h1 className={"space"}>NOOT</h1>
      <div className="textSign">
        <p>Ich muess ufs WC</p>
        <hr />
      </div>

      <button className={"loginButton"} onClick={() => navigate("/login")}>LOGIN</button>
      <iframe
        src="https://automatique17257811.files.wordpress.com/2021/04/pingu-1.gif"
        frameBorder="0"
        width="100%"
        height="100%"
        title="logo"
      ></iframe>
      <img src={logo} className="App-logo img" alt="logo" />
    </Box>
  );
}
