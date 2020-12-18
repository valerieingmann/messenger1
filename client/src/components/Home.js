import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/user";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Sidebar } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { clearOnLogout, fetchConversations } from "../store/conversations";
import socket from "../socket";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh"
  }
}));

const Home = (props) => {
  const classes = useStyles();
  const { user, logout, fetchConversations } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user.id) {
      setIsLoggedIn(true);
    }
  }, [user.id]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Sidebar />
        <ActiveChat />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations.all
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
      dispatch(clearOnLogout());
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
