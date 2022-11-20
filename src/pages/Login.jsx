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
import { signIn, signUpWithGoogle } from "../helpers/firebase";
import { useLoginContext } from "../contexts/AuthContext";
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

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useLoginContext();
  const Copyright = () => {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}

        {new Date().getFullYear()}
      </Typography>
    );
  };

  const handleGoogleProvider = () => {
    signUpWithGoogle(navigate, setCurrentUser);
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
          src="https://cdn-icons-png.flaticon.com/512/5373/5373255.png"
          alt=""
          width={100}
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            signIn(values, navigate);
            actions.resetForm();
            actions.setSubmitting(false);
            // console.log(actions.errors);
            // console.log("values", values);
          }}
        >
          {({
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            touched,
            errors,
          }) => (
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
                  fullWidth
                  color="success"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Button
                  fullWidth
                  color="success"
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
          <Link to="/register" color="success">
            Do you have not an account?
          </Link>
        </Box>
      </Box>
      <Copyright sx={{ mt: 10, mb: 4 }} />
    </Container>
  );
};

export default Login;
