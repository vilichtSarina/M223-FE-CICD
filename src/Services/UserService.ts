import api from '../config/Api';
import { User } from '../types/models/User.model';

const UserService = {
  getUser: async (userID: string): Promise<User> => {
    const { data } = await api.get<User>(`/api/users/${userID}`);
    return data;
  },

  updateUser: (user: User) => {
    return api.put(`/api/users/${user.id}`, user);
  },

  addUser: (user: User) => {
    return api.post('/api/users/registerUser', user).then((res) => {
      return res.data;
    });
  },

  getAllUsers: () => {
    return api.get(`/api/users`);
  },

  deleteUser: (id: string) => {
    return api.delete(`/api/users/${id}`);
  },
};

export default UserService;
