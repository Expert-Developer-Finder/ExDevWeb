import React from "react";
import { Box } from "@mui/system";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { NavBar } from "./components";
import { ComingSoon, WelcomeScreen, About, Plans, Register, Login, Profile } from "./pages";


const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Box>
        <NavBar />
        <Switch>
          <Route path="/" exact component={() => (!user ? <WelcomeScreen /> : <ComingSoon />)}/>
          <Route path="/about" exact component={() => (!user ? <About/> : <Redirect to="/" /> )}/>
          <Route path="/plans" exact component={() => (!user ? <Plans/> : <Redirect to="/" /> )}/>
          <Route path="/register" exact component={() => (!user ? <Register/> : <Redirect to="/" /> )}/>
          <Route path="/login" exact component={() => (!user ? <Login/> : <Redirect to="/" /> )}/>
          <Route path="/profile" exact component={() => (user ? <Profile/> : <Redirect to="/" /> )}/>
        </Switch>
      </Box>
    </BrowserRouter>
  );
};

export default App;
