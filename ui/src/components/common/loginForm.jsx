import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import { result } from "lodash";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
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
    const validationResult = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });

    if (!validationResult.error) {
      return null;
    }

    const errors = { ...this.state.errors };
    for (let item of validationResult.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = (input) => {
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
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
          <button className="btn btn-primary" disabled={this.validate()}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
