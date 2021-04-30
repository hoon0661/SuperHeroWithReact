import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    console.log("Submitted");
  };

  validate = () => {
    const validationResult = Joi.validate(this.state.account, this.schema);
    console.log(validationResult);

    const errors = {};
    const { username, password } = this.state.account;
    if (username.trim() === "") {
      errors.username = "Username is required.";
    }
    if (password.trim() === "") {
      errors.password = "Password is required.";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = (input) => {
    if (input.value.trim() === "") {
      if (input.name === "username") {
        return "Username is required.";
      }
      if (input.name === "password") {
        return "Password is required.";
      }
    }
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else {
      delete errors[e.currentTarget.name];
    }

    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account, errors });
  };

  render() {
    const { username, password } = this.state.account;
    const { errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={username}
            label="UserName"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
