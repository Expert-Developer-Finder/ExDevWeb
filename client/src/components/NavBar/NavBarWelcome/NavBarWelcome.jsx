import React, {useEffect, useState} from "react";
import { AppBar, Button, Toolbar, Typography, Link } from "@mui/material";
import useStyles from "./styles.js";
import {useLocation} from "react-router-dom";


function NavBarWelcome(props) {
  const classes = useStyles();
  const [boldIndex, setBoldIndex] = useState(0);
  let location = useLocation();

  const menuItems = [{path:"/", index:0, title: "Home"},{path:"/plans", index: 1, title: "Plans"},{path:"/about", index: 2, title: "About"} ];

  useEffect(()=>{
    const {index} =  menuItems.find((item)=> location.pathname === item.path)
    setBoldIndex(index);
  }, [location, menuItems]);


  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link underline="none" href="/"> <Typography className={classes.heading} >ExDev</Typography> </Link>

      <Toolbar className={classes.toolbar}>

        {
          menuItems.map((item)=> {
            return (
              <Button 
                className={classes.menuItem} 
                href={item.path} 
                style={ boldIndex === item.index ?  {fontWeight:"bolder", fontSize:"large"}: {}} 
                onClick={()=>setBoldIndex(item.index)}
                key={item.index}
                > {item.title} </Button>
            );
          })
        }

        
      </Toolbar>
    </AppBar>
  );
}

export default NavBarWelcome;
