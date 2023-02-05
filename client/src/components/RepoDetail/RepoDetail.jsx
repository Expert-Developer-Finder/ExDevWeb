import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkAndGetRepoWithId } from "../../api";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Container,
  Box,
  Badge,
  Divider,
} from "@material-ui/core";
import useStyle from "./styles";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import { RepoMembers } from "../../components";

const RepoDetail = ( {repo}) => {
  let { id: repoId } = useParams();
  const user = JSON.parse(localStorage.getItem("profile")).result;

  const classes = useStyle();

  return (
    <Container className={classes.container}>
      <Typography variant="h3">Members </Typography>
      <RepoMembers />
    </Container>
  );
};

export default RepoDetail;
