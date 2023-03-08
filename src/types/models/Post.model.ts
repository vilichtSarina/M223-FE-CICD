import { User } from "./User.model";
export type Post = {
  id: string | undefined;
  imageUrl: string;
  author: User;
  description: string;
  likes: User[];
};

export type UpdatePostDto = {
  id?: string;
  imageUrl: string;
  description: string;
};
