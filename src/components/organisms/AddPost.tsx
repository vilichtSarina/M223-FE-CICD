import "../components.css";
import { Button, TextField } from "@mui/material";
import { UpdatePostDto } from "../../types/models/Post.model";
import { useFormik, FormikValues } from "formik";
import "./AddPost.css";
import { User } from "../../types/models/User.model";

declare type props = {
  onAddPost: (addedPost: UpdatePostDto) => void;
  user: User;
};
export default function AddPost({ onAddPost, user }: props) {
  const validateForm = (values: FormikValues) => {
    const errors: { url?: string; description?: string } = {};

    if (!values.url) {
      errors.url = "Please provide an image url";
    } else if (/\s/.test(values.url)) {
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
      url: "",
      description: "",
    },
    validate: validateForm,
    onSubmit: (values, { setSubmitting }) => {
      const addedPost: UpdatePostDto = {
        imageUrl: values.url,
        description: values.description,
      };
      setSubmitting(false);
      onAddPost(addedPost);
    },
  });

  return (
    <div>
      <form className={"addPost"} onSubmit={formik.handleSubmit}>
        <Button
          style={{ width: "70%", marginTop: "10px" }}
          type={"submit"}
          variant={"contained"}
          color={"success"}
          size={"large"}
          disabled={formik.isSubmitting}
        >
          Add Post
        </Button>
        <div className="addPostInput">
          {formik.errors.url && (
            <div className="errorMessage">*{formik.errors.url}</div>
          )}
          <TextField
            required
            id={"image"}
            style={{ width: "100%" }}
            type={"text"}
            label="Image URL"
            variant="outlined"
            value={formik.values.url}
            onChange={formik.handleChange}
            name="url"
          />
        </div>
        <div className="addPostInput">
          {formik.errors.description && (
            <div className="errorMessage">*{formik.errors.description}</div>
          )}
          <TextField
            onChange={formik.handleChange}
            id={"description"}
            style={{ width: "100%" }}
            type={"text"}
            label="Description"
            variant="outlined"
            value={formik.values.description}
            name="description"
            multiline
          />
        </div>
      </form>
    </div>
  );
}
