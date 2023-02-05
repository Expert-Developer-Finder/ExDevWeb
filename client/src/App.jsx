import React from "react";
import { Box } from "@mui/system";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { NavBar } from "./components";
import {  Register, Login, Profile, Home, JoinRepo, CreateRepo,Repo } from "./pages";


const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Box>
        <NavBar />
        <Switch>
          <Route path="/" exact component={()=><Home/>}/>
          <Route path="/join-repo" exact component={() => (user ? <JoinRepo/> : <Redirect to="/" /> )}/>
          <Route path="/create-repo" exact component={() => (user ? <CreateRepo/> : <Redirect to="/" /> )}/>
          <Route path="/profile" exact component={() => (user ? <Profile/> : <Redirect to="/" /> )}/>
          <Route path="/repo/:id" exact component={() => (user ? <Repo/> : <Redirect to="/" /> )}/>
       
          <Route path="/register" exact component={() => (!user ? <Register/> : <Redirect to="/" /> )}/>
          <Route path="/login" exact component={() => (!user ? <Login/> : <Redirect to="/" /> )}/>
        </Switch>
      </Box>
    </BrowserRouter>
  );
};

export default App;
