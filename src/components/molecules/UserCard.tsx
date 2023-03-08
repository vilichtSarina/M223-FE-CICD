import Typography from "@mui/material/Typography";
import { User } from "../../types/models/User.model";
import "./UserCard.css";

interface props {
  user: User;
}

const UserCard = ({ user }: props) => {
  return (
    <div className="userCard">
      <Typography
        style={{ textDecoration: "underline" }}
        color={"aqua"}
        variant={"h6"}
      >
        User:
      </Typography>
      <Typography color={"aqua"} variant={"h6"}>
        {user.firstName + " " + user.lastName}
      </Typography>
      <Typography
        style={{ textDecoration: "underline" }}
        color={"aqua"}
        variant={"h6"}
      >
        {user.email}
      </Typography>
    </div>
  );
};

export default UserCard;
