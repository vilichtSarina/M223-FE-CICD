import "../components.css";
import { User } from "../../types/models/User.model";
import UserCard from "../molecules/UserCard";

declare type props = {
  user: User;
};

export default function UserInfo({ user }: props) {
  return (
    <div className={"userInfo"}>
      <UserCard user={user} />
    </div>
  );
}
