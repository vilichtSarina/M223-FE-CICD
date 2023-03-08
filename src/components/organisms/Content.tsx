import "../components.css";
import Post from "../molecules/Post";
import { Post as PostType, UpdatePostDto } from "../../types/models/Post.model";
import { User } from "../../types/models/User.model";
import { Dispatch, SetStateAction } from "react";
import PostService from "../../Services/PostService";
import { AxiosError, AxiosResponse } from "axios";
import alertService from "../../Services/AlertService";

declare type props = {
  posts: PostType[];
  user: User;
  checkIfAuthorOrAdmin: (userToCheck: User, authorId: string) => boolean;
  onDeletePost: (
    event: React.MouseEvent<HTMLButtonElement>,
    deletedPostId: string
  ) => void;
  setPosts: Dispatch<SetStateAction<PostType[]>>;
};
export default function Content({
  posts,
  user,
  checkIfAuthorOrAdmin,
  onDeletePost,
  setPosts,
}: props) {

  const onEditPost = (updatedPost: UpdatePostDto) => {
    PostService.updatePost(updatedPost)
      .then((response: AxiosResponse) => {
        alertService.success("Good job! You edited a Post!");
          let tempPosts = [...posts];
          // get index then replace
          tempPosts[posts.findIndex((post) => post.id === updatedPost.id)] =
          response.data;
        setPosts(tempPosts);
      })
      .catch((error: AxiosError) => {
        alertService.error("Error: " + error.response?.data.errors);
      });
  };
  return (
    <div className={"content"}>
      <div className="contentCards">
        {posts.map((post: PostType, index: number) => (
          <Post
            key={index}
            isAuthorOrAdmin={checkIfAuthorOrAdmin(user, post.author.id!)}
            post={post}
            onDeletePost={onDeletePost}
            onEditPost={onEditPost}
          />
        ))}
      </div>
    </div>
  );
}
