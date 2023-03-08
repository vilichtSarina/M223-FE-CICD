import "./DetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../organisms/Navbar";
import Content from "../../organisms/Content";
import { useEffect, useState, useContext } from "react";
import { Post as PostType } from "../../../types/models/Post.model";
import postService from "../../../Services/PostService";
import UserInfo from "../../organisms/UserInfo";
import { User } from "../../../types/models/User.model";
import UserService from "../../../Services/UserService";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import { AxiosError } from "axios";
import alertService from "../../../Services/AlertService";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [author, setAuthor] = useState<User>();
  const activeUserContext = useContext(ActiveUserContext);


  useEffect(() => {
    UserService.getUser(id!).then((response) => {
      setAuthor(response);
    });
  }, [id, navigate]);

  useEffect(() => {
    postService
      .getPostByUserId(id!)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => navigate("/home"));
  }, [author, id, navigate]);

  const onDeletePost = (
    event: React.MouseEvent<HTMLButtonElement>,
    deletedPostId: string
  ): void => {
    event.preventDefault();
    postService
      .deletePost(deletedPostId)
      .then((response) => {
        alertService.success("You deleted a Post!");
        setPosts((prevPosts) =>
          prevPosts.slice(
            prevPosts.findIndex((post) => post.id === deletedPostId, 1)
          )
        );
      })
      .catch((error: AxiosError) => {
       alertService.error("Error!")
      });
  };

  if (activeUserContext.user === null) {
    navigate("/login");
  }

  return (
    <div className="detailPage">
      <Navbar />
      {activeUserContext.user && (
        <div className="wrapContent">
          {id &&
          author &&
          activeUserContext.isAuthorOrAdmin(activeUserContext.user, id) ? (
            <UserInfo user={author} />
          ) : (
            <div className="placeholder" />
          )}
          <Content
            checkIfAuthorOrAdmin={activeUserContext.isAuthorOrAdmin}
            user={activeUserContext.user}
            posts={posts}
            setPosts={setPosts}
            onDeletePost={onDeletePost}
          />
        </div>
      )}
    </div>
  );
}
