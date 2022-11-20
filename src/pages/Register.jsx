import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { createUser, signUpWithGoogle } from "../helpers/firebase";
import GoogleLogo from "../assets/google.png";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please  enter an email"),
  password: yup
    .string()
    .required("Please enter a password ")
    .min(8, "Password must have min 8 chars")
    .max(16, "Password must have max 16 chars")
    .matches(/\d+/, "Password must have a number")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[A-Z]+/, "Password must have an uppercase")
    .matches(/[!,?{}><%&$#£+-.]+/, " Password must have a special char"),
});

const Register = () => {
  const navigate = useNavigate();

  const Copyright = () => {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}

        {new Date().getFullYear()}
      </Typography>
    );
  };

  const handleGoogleProvider = () => {
    signUpWithGoogle(navigate);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ textAlign: "start" }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/6388/6388049.png"
          alt=""
          width={100}
        />
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            createUser(values, navigate);
            actions.resetForm();
            actions.setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <Box sx={{ mt: 1 }}>
                <TextField
                  sx={{ my: 2 }}
                  fullWidth
                  color="success"
                  label="Email"
                  name="email"
                  id="email"
                  type="email"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  color="success"
                  label="Password"
                  name="password"
                  id="password"
                  type="password"
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Button
                  type="submit"
                  color="success"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
                <Button
                  color="success"
                  fullWidth
                  variant="contained"
                  sx={{
                    mb: 2,
                  }}
                  onClick={handleGoogleProvider}
                >
                  <img src={GoogleLogo} alt="google" width={105} />
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        <Box sx={{ textAlign: "center", mb: 1 }}>
          <Link to="/login">Do you have an account?</Link>
        </Box>
      </Box>
      <Copyright sx={{ mt: 10, mb: 4 }} />
    </Container>
  );
};

export default Register;
