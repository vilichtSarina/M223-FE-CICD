import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Post } from "../../types/models/Post.model";
import { PanoramaFishEye } from "@mui/icons-material";

interface props {
  open: boolean;
  handleClose: () => void;
  post: Post;
}

export default function PostLikeDialog({
  open,
  handleClose,
  post,
}: props) {

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Likes:</DialogTitle>
      <DialogContent sx={{width: "350px"}}>
        {
          post.likes.map((user, index: number) => (
            <DialogContentText key={index}>
                <PanoramaFishEye fontSize={"inherit"} />{" " + user.firstName} {user.lastName}
          </DialogContentText>
          ))
        }

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
