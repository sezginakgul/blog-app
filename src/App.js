import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthContextProvider from "./contexts/AuthContext";
import BlogContextProvider from "./contexts/BlogContext";
import AppRouter from "./router/AppRouter";
import { colors, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    success: {
      main: colors.teal[800],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BlogContextProvider>
        <AuthContextProvider>
          <AppRouter />
          <ToastContainer />
        </AuthContextProvider>
      </BlogContextProvider>
    </ThemeProvider>
  );
}

export default App;
