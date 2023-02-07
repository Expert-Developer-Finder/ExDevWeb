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
import { RepoMembers, RepoOwners } from "../../components";

const RepoDetail = ( {repo, isMember}) => {
  const user = JSON.parse(localStorage.getItem("profile")).result;
  console.log(repo);

  const classes = useStyle();

  return (
    <Container className={classes.container}>
      <Typography variant="h4">Repository Owners </Typography>
      <RepoOwners isMember={isMember} repo={repo} />

      <Typography variant="h4">Members </Typography>
      <RepoMembers isMember={isMember}  repo={repo} />

    </Container>
  );
};

export default RepoDetail;
