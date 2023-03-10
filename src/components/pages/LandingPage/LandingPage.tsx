import "./LandingPage.css";
import Navbar from "../../organisms/Navbar";
import Content from "../../organisms/Content";
import AddPost from "../../organisms/AddPost";
import { useEffect, useState, useContext } from "react";
import {
  Post as PostType,
  UpdatePostDto,
} from "../../../types/models/Post.model";
import postService from "../../../Services/PostService";
import { AxiosError } from "axios";
import UserInfo from "../../organisms/UserInfo";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import { Pagination } from "@mui/material";
import alertService from "../../../Services/AlertService";

export default function LandingPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const activeUserContext = useContext(ActiveUserContext);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const getPaginationPosts = () => {
    postService.getPaginationPosts(page, 5).then((response) => {
      setPosts(response.data);
    });
  };

  const getPaginationCount = () => {
    postService.getAllPosts().then((response) => {
      setPageCount(Math.round(response.data.length / 5));
    });
  };

  useEffect(() => {
    getPaginationPosts();
  }, [page]);

  useEffect(() => {
    getPaginationCount();
  }, []);

  /** handles MUI Pagination Component input */
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const onAddPost = (addedPost: UpdatePostDto): void => {
    postService
      .createPost(addedPost)
      .then(() => {
        alertService.success("Good Job. Post created!");
        getPaginationPosts();
        getPaginationCount();
      })
      .catch((error: AxiosError) => {
        alertService.error(
          "Image Post failed: " + error.response?.data.errors.imageUrl
            ? error.response?.data.errors.imageUrl
            : error.response?.data.errors.description
        );
      });
  };

  const onDeletePost = (
    event: React.MouseEvent<HTMLButtonElement>,
    deletedPostId: string
  ): void => {
    event.preventDefault();
    postService
      .deletePost(deletedPostId)
      .then(() => {
        alertService.success("You deleted a Post.");
        getPaginationPosts();
        getPaginationCount();
      })
      .catch((error: AxiosError) => {
        alertService.error("Error: " + error);
      });
  };

  return (
    <div className="landingPage">
      <Pagination
        className={"pagination"}
        count={pageCount}
        variant="outlined"
        page={page + 1}
        onChange={handleChange}
      />
      <Navbar />
      {activeUserContext.user && (
        <div className="wrapContent">
          <AddPost user={activeUserContext.user} onAddPost={onAddPost} />
          <Content
            user={activeUserContext.user}
            checkIfAuthorOrAdmin={activeUserContext.isAuthorOrAdmin}
            posts={posts}
            onDeletePost={onDeletePost}
            setPosts={setPosts}
          />
          <UserInfo user={activeUserContext.user} />
        </div>
      )}
    </div>
  );
}
