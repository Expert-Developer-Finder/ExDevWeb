import React, { useState } from "react";
import { Container, Grid, Typography, Alert, AlertTitle } from "@mui/material";
import useStyles from "./styles.js";
import { Input } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin } from "../../actions/auth.js";
import { Button } from "@material-ui/core";
import { LOGOUT } from "../../constants/actionTypes.js";

const initialState = { email: "", password: "" };
const Login = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(signin(formData, history));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordShow = () => setShowPassword(!showPassword);

  const { authData, error } = useSelector((state) => state.auth);

  return (
    <Container className={classes.container}>
      <img alt="A welcoming woman" className={classes.img} src={require("../../assets/female01.svg")} />

      <div>
        {error && authData && (
          <>
            <Alert
              severity="error"
              onClose={() => {
                dispatch({ type: LOGOUT });
              }}
            >
              <AlertTitle>Error</AlertTitle>
              {authData} — <strong>Try again</strong>
            </Alert>
            <br/>
          </>
        )}
        <Typography variant="h3">Welcome Back</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2} maxWidth={500}>
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              autoFocus
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handlePasswordShow={handlePasswordShow}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Button href="/register">
                {" "}
                Don't have an account? Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
