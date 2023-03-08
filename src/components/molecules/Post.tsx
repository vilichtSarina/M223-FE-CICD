import "../components.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import { Post as PostType, UpdatePostDto } from "../../types/models/Post.model";
import { useContext, useEffect, useState } from "react";
import PostService from "../../Services/PostService";
import DeleteIcon from "@mui/icons-material/Delete";
import ActiveUserContext from "../../Contexts/ActiveUserContext";
import { User } from "../../types/models/User.model";
import { Link } from "react-router-dom";
import PostEditForm from "./PostEditForm";
import PostLikeDialog from "./PostLikeDialog";
import { AxiosResponse } from "axios";

interface props {
  isAuthorOrAdmin: boolean;
  post: PostType;
  onDeletePost: (
    event: React.MouseEvent<HTMLButtonElement>,
    deletedPostId: string
  ) => void;
  onEditPost: (updatedPost: UpdatePostDto) => void;
}

export default function Post({
  isAuthorOrAdmin,
  post,
  onDeletePost,
  onEditPost,
}: props) {
  const [isLiked, setIsLiked] = useState(false);
  const activeUserContext = useContext(ActiveUserContext);

  // useState decides if dialog is open or closed
  const [editOpen, setEditOpen] = useState(false);
  const [likeOpen, setLikeOpen] = useState(false);

  // handle EditDialog open and close
  const handleClickEditOpen = () => {
    setEditOpen(true);
  };

  const handleClickEditClose = () => {
    setEditOpen(false);
  };
  // handle LikeDialog open and close
  const handleClickLikeOpen = () => {
    setLikeOpen(true);
  };

  const handleClickLikeClose = () => {
    setLikeOpen(false);
  };

  //check if active user likes the post
  useEffect(() => {
    setIsLiked(
      post.likes!.filter((like: User) => like.id === activeUserContext.user?.id)
        .length > 0
    );
  }, [activeUserContext.user, isLiked, post.likes]);

  const handleLike = () => {
    PostService.likePost(post.id!).then((response: AxiosResponse) => {
      setIsLiked(!isLiked);
      if (!isLiked) {
        post.likes.push(activeUserContext.user!);
      } else {
        let i = post.likes.indexOf(activeUserContext.user!);
        post.likes.splice(i, 1);
      }
    });
  };

  return (
    <>
      <Card sx={{ width: 345 }} style={{ margin: "5px 0 10px 0" }}>
        <CardMedia
          component="img"
          alt="image post"
          max-width={"400px"}
          min-width={"400px"}
          image={post.imageUrl}
          sx={{ objectFit: "contain" }}
        />
        <CardContent sx={{ wordWrap: "break-word" }}>
          <Typography gutterBottom variant="h6" component="div">
            <Link to={`/users/${post.author.id}`}>
              {post.author.firstName}{" "}
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleLike} size="small">
            <p style={{ paddingRight: "5px", fontSize: "90%", margin: 0 }}>
              {post.likes.length}
            </p>
            <ThumbUp id={"button"} color={isLiked ? "info" : "inherit"} />
          </IconButton>
          {isAuthorOrAdmin && (
            <>
              <IconButton
                size="small"
                onClick={(e) => onDeletePost(e, post.id!)}
              >
                <DeleteIcon />
              </IconButton>
              <Button
                onClick={handleClickEditOpen}
                size="small"
                color="inherit"
              >
                Edit
              </Button>
              <PostEditForm
                open={editOpen}
                handleClose={handleClickEditClose}
                post={post}
                onEditPost={onEditPost}
              />
            </>
          )}
          <Button onClick={handleClickLikeOpen}>View Likes</Button>
          <PostLikeDialog
            open={likeOpen}
            handleClose={handleClickLikeClose}
            post={post}
          />
        </CardActions>
      </Card>
    </>
  );
}
