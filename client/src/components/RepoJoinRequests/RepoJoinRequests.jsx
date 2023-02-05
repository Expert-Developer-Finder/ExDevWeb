import React from "react";
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
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import useStyle from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const RepoJoinRequests = ({ repo }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  let { id: repoId } = useParams();

  //  TODO çok istersen şurdak 3 butonu refactor edip navbar yap
  return (
    <Container className={classes.container}>
      <Typography variant="h3">Pending Requests</Typography>
    </Container>
  );
};

export default RepoJoinRequests;
