import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../../Services/UserService";
import { User } from "../../../types/models/User.model";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      UserService.getUser(id)
        .then((response) => setUser(response))
        .catch((error) => {
          navigate("/users/all");
        });
    }
  }, []);

  return (
    <div>
      <div className="user-detail">
        <p>User with id {id}</p>
      </div>
    </div>
  );
}

export default UserDetail;
