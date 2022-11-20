import React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as yup from "yup";
import blog from "../assets/blog.png";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { UpdatedBlog } from "../helpers/firebase";

const newBlogSchema = yup.object().shape({
  title: yup.string().required("Please  enter a title"),
  imageUrl: yup.string().url().required("Please enter a imageURL"),
  content: yup
    .string()
    .required("Please  enter a content")
    .min(30, "Content must have a 20 chars"),
  // createdOn: date().default(() => new Date()),
});

const UpdateBlog = () => {
  const { state: data } = useLocation();
  // console.log("updateBlog", data);
  const navigate = useNavigate();
  return (
    <Container component="main" maxWidth="xs" sx={{ textAlign: "start" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={blog} alt="" width={200} />
        <Typography component="h1" variant="h5">
          Update Blog
        </Typography>

        <Formik
          initialValues={{
            id: data.id,
            createdOn: data.createdOn,
            email: data.email,
            title: data.title,
            imageUrl: data.imageUrl,
            content: data.content,
          }}
          validationSchema={newBlogSchema}
          onSubmit={(values, actions) => {
            // console.log("NewBlog", values);
            UpdatedBlog(values);
            navigate("/");
          }}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <Box sx={{ mt: 5 }}>
                <TextField
                  fullWidth
                  color="success"
                  label="Title"
                  name="title"
                  id="title"
                  variant="outlined"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />

                <TextField
                  sx={{ my: 2 }}
                  fullWidth
                  color="success"
                  label="ImageUrl"
                  name="imageUrl"
                  id="imageUrl"
                  variant="outlined"
                  value={values?.imageUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.imageUrl && Boolean(errors.imageUrl)}
                  helperText={touched.imageUrl && errors.imageUrl}
                />

                <TextField
                  fullWidth
                  color="success"
                  label="Content"
                  name="content"
                  id="content"
                  multiline
                  rows={7}
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.content && Boolean(errors.content)}
                  helperText={touched.content && errors.content}
                />
                <Button
                  type="submit"
                  color="success"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  update
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UpdateBlog;
