import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthContextProvider from "./contexts/AuthContext";
import BlogContextProvider from "./contexts/BlogContext";
import AppRouter from "./router/AppRouter";
// import { createTheme } from "@mui/material/styles";
// import { ThemeProvider } from "@emotion/react";

function App() {
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       light: blueGrey[500],
  //     },
  //   },
  // });
  return (
    <BlogContextProvider>
      <AuthContextProvider>
        <AppRouter />
        <ToastContainer />
      </AuthContextProvider>
    </BlogContextProvider>
  );
}

export default App;
