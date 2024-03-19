/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React from "react";
import { AppBar, Button, Typography, Avatar, Toolbar } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import styles from "../Styles/Navbar.module.css";

export const Navbar = () => {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const Navigate = useNavigate();
  const Location = useLocation();

  const logout = () => {
    google.accounts.id.disableAutoSelect();
    Navigate("/auth");
    setUser(localStorage.clear());
  };
  React.useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [Location]);

  return (
    <AppBar
      className={styles.appBar}
      position="static"
      color="inherit"
      sx={{
        flexDirection: {
          xs: "column",
          sm: "row",
          md: "row",
          lg: "row",
          xl: "row",
        },
      }}
    >
      <div className={styles.brandContainer}>
        <Typography
          component={Link}
          to="/flashback"
          className={styles.heading}
          sx={{ fontSize: "30px", fontWeight: 600 }}
          align="center"
        >
          FLASHBACK
        </Typography>
        <img
          className={styles.image}
          src="https://cdn.pixabay.com/user/2014/05/07/00-10-34-2_250x250.jpg"
          alt="flashback"
          height="60"
        />
      </div>
      <Toolbar className={styles.toolbar}>
        {user ? (
          <div className={styles.profile}>
            <Avatar
              className={styles.purple}
              alt={user.name}
              src={user.picture}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Typography className={styles.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={styles.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
