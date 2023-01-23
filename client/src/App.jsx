import React from "react";
import { Box } from "@mui/system";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { NavBar } from "./components";
import { ComingSoon, WelcomeScreen } from "./pages";
import About from "./pages/About/About";
import Plans from "./pages/Plans/Plans";

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
        </Switch>
      </Box>
    </BrowserRouter>
  );
};

export default App;
