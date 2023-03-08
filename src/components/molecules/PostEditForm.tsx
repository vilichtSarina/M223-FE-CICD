import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik, FormikValues } from "formik";
import {
  Post,
  UpdatePostDto,
} from "../../types/models/Post.model";

interface props {
  open: boolean;
  handleClose: () => void;
  post: Post;
  onEditPost: (updatedPost: UpdatePostDto) => void;
}

export default function PostEditForm({
  open,
  handleClose,
  post,
  onEditPost,
}: props) {
  const validateForm = (values: FormikValues) => {
    const errors: { url?: string; description?: string } = {};

    if (!values.url) {
      errors.url = "Please provide an image url";
    }else if (/\s/.test(values.url)) {
      errors.url =
          "Whitespace not allowed in URL!";
    } else if (values.url.length < 10) {
      errors.url = "Please provide an image url with at least 10 characters";
    } else if (values.url.length > 200) {
      errors.url =
        "Please provide an image url with no more than 200 characters";
    }

    if (values.description.length > 200) {
      errors.description =
        "Please provide a description with no more than 200 characters";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      url: post.imageUrl,
      description: post.description,
    },
    validate: validateForm,
    onSubmit: (values, { setSubmitting }) => {
      const editedPost: UpdatePostDto = {
        id: post.id!,
        imageUrl: values.url,
        description: values.description,
      };
      setSubmitting(false);
      handleClose();
      onEditPost(editedPost);
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To Update this post, please enter the necessary values here.
          </DialogContentText>
          {formik.errors.url && (
            <div className="errorMessage">*{formik.errors.url}</div>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Image Url"
            type="text"
            value={formik.values.url}
            fullWidth
            onChange={formik.handleChange}
            variant="standard"
            name="url"
            required
          />
          {formik.errors.description && (
            <div className="errorMessage">*{formik.errors.description}</div>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={formik.values.description}
            label="Description"
            type="text"
            fullWidth
            onChange={formik.handleChange}
            name="description"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type={"submit"}
            variant={"contained"}
            color={"success"}
            disabled={formik.isSubmitting}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
