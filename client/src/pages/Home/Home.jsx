import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {ComingSoon, WelcomeScreen} from "../";

const Home = () => {
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    // JWT...
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  // Home component shows welcome page if there is no user loged in
  return (
    <>
    {user ? 
        <ComingSoon/> :
        <WelcomeScreen/>
    }
    </>
    
  )
}

export default Home