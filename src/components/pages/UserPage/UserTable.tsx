import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { User } from '../../../types/models/User.model';
import UserService from '../../../Services/UserService';
import { useNavigate } from 'react-router-dom';
import alertService from "../../../Services/AlertService";

const UserTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  const setUserList = () => {
    UserService.getAllUsers().then((data) => {
      setUsers(data.data);
    });
  }

  useEffect(() => {
    setUserList()
  }, []);

  const handleAdd = () => {
    navigate('../useredit/');
  };

  const handleEdit = (id: string) => {
    navigate('../useredit/' + id);
  };

  const handleDelete = (id: string) => {
    UserService.deleteUser(id).then(response =>{
      alertService.success("Deleted User!")
      setUserList()
    }).catch(error =>{
      alertService.error("Failed to delete User!")
    })
  };

  return (
    <>
      {users.map((user) => (
        <div id={"userTable"} key={user.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {user.firstName} {user.lastName} {user.email}
              <CardActions>
                <Button
                  size='small'
                  color='primary'
                  variant='contained'
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </Button>
                <Button
                  size='small'
                  color='error'
                  variant='contained'
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      ))}
      <Button
          id={"addUser"}
        size='small'
        color='success'
        variant='contained'
        onClick={handleAdd}
      >
        Add
      </Button>
    </>
  );
};

export default UserTable;
