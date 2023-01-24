import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Link,
  Avatar,
} from "@mui/material";
import useStyles from "./styles.js";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function NavBar() {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [boldIndex, setBoldIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [toggleOn, setToggleOn] = useState(false);

  const menuItems = [
    { path: "/", index: 0, title: "Home" },
    { path: "/plans", index: 1, title: "Plans" },
    { path: "/about", index: 2, title: "About" },
  ];

  useEffect(() => {
    setShow(matches);
    if (matches) setToggleOn(false);
  }, [matches]);


  useEffect(() => {
    const { index } =
      menuItems.find((item) => location.pathname === item.path) || -1;
    setBoldIndex(index);
  }, [menuItems, location.pathname]);

  useEffect(() => {
    // JWT...
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  if (!user) return <></>;

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      {(!show || (show && toggleOn)) &&
        (!toggleOn ? (
          <MenuIcon
            className={classes.toggleClosed}
            onClick={() => {
              setToggleOn(true);
              setShow(true);
            }}
          />
        ) : (
          <CloseIcon
            className={classes.toggleClosed}
            onClick={() => {
              setToggleOn(false);
              setShow(false);
            }}
          />
        ))}
      <div className={classes.main}>
        <Link underline="none" href="/">
          {" "}
          <Typography className={classes.heading}>ExDev</Typography>{" "}
        </Link>
        {show &&
          menuItems.map((item) => {
            return (
              <Button
                className={classes.menuItem}
                href={item.path}
                style={
                  boldIndex === item.index
                    ? { fontWeight: "bolder", fontSize: "large" }
                    : {}
                }
                onClick={() => setBoldIndex(item.index)}
                key={item.index}
              >
                {" "}
                {item.title}{" "}
              </Button>
            );
          })}
        {show && (
          <Toolbar className={classes.toolbar}>
            <Link href="/profile" underline="none">
            <div className={classes.profile} >
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0).toUpperCase()}
              </Avatar>
              &nbsp;&nbsp;
              <Typography className={classes.userName}>
                {user.result.name}{" "}
              </Typography>
            </div>
            </Link>
          </Toolbar>
        )}
      </div>
    </AppBar>
  );
}

export default NavBar;
