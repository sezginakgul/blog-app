import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import BlogLogo from "../assets/blog.png";
import { useLoginContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { logOut } from "../helpers/firebase";

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { currentUser } = useLoginContext();
  // console.log("nav", currentUser);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const CloseLogin = () => {
    logOut();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <AdbIcon
            sx={{ display: { xs: "flex" }, mr: 1 }}
            onClick={() => navigate("/")}
          />

          <Box sx={{ display: { xs: "flex" } }}>
            <img
              src={BlogLogo}
              alt=""
              width="150px"
              onClick={() => navigate("/")}
            />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={currentUser?.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {currentUser && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </Typography>
                </MenuItem>
              )}

              {currentUser && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => navigate("/newblog")}
                  >
                    New
                  </Typography>
                </MenuItem>
              )}
              {currentUser ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={CloseLogin}>
                    Logout
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Typography>
                </MenuItem>
              )}

              {!currentUser && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
