import React from "react";
import { connect } from "react-redux";
import { login } from "../store/user";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import { LoginForm } from "../components";

const Login = (props) => {
  const { user, login } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <Button type="button" onClick={() => props.history.push("/register")}>
        Create an Account
      </Button>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);