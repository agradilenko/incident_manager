import React, { Component } from "react";
import { Link, withRouter, Route } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import {
  AuthButton,
  AuthError,
  AuthForm,
  AuthGroup,
  AuthHeader,
  AuthInput,
  AuthLabel,
  AuthLink,
  BaseWrapper,
  BottomGroup,
} from "./AuthStyledComponents";
import { compose } from "redux";
import {
  AuthInterface,
  ErrorInterface,
  RegisterProps,
  RegisterState,
} from "./RegisterInterfaces";

class Register extends Component<
  RegisterProps & Route & RouteComponentProps,
  RegisterState
> {
  constructor(props: RegisterProps & Route & RouteComponentProps) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      position: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps: { errors: ErrorInterface }) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.currentTarget.value });
  };

  onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.currentTarget.value });
  };

  onChangePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ position: e.currentTarget.value });
  };

  onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value });
  };

  onChangePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password2: e.currentTarget.value });
  };

  onSubmit = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      position: this.state.position,
      password: this.state.password,
      password2: this.state.password,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <BaseWrapper>
        <AuthHeader>Register Below</AuthHeader>
        <AuthForm noValidate onSubmit={this.onSubmit}>
          <AuthGroup>
            <label>
              <AuthLabel>Name</AuthLabel>
              <AuthInput
                name="name"
                onChange={this.onChangeName}
                value={this.state.name}
                error={errors.name}
              />
              <AuthError>{errors.name}</AuthError>
            </label>
          </AuthGroup>
          <AuthGroup>
            <label>
              <AuthLabel>Email address</AuthLabel>
              <AuthInput
                name="email"
                onChange={this.onChangeEmail}
                value={this.state.email}
                error={errors.email}
              />
              <AuthError>{errors.email}</AuthError>
            </label>
          </AuthGroup>
          <AuthGroup>
            <label>
              <AuthLabel>Position</AuthLabel>
              <AuthInput
                name="position"
                onChange={this.onChangePosition}
                value={this.state.position}
                error={errors.position}
              />
              <AuthError>{errors.position}</AuthError>
            </label>
          </AuthGroup>
          <AuthGroup>
            <label>
              <AuthLabel>Password</AuthLabel>
              <AuthInput
                type="password"
                name="password"
                onChange={this.onChangePassword}
                value={this.state.password}
                error={errors.password}
              />
              <AuthError>{errors.password}</AuthError>
            </label>
          </AuthGroup>
          <AuthGroup>
            <label>
              <AuthLabel>Confirm Password</AuthLabel>
              <AuthInput
                type="password"
                name="password2"
                onChange={this.onChangePassword2}
                value={this.state.password2}
                error={errors.password2}
              />
              <AuthError>{errors.password2}</AuthError>
            </label>
          </AuthGroup>
          <div>
            <AuthButton type="submit">Sign up</AuthButton>
          </div>
          <BottomGroup>
            <AuthLink>
              <Link to="/">Sign in</Link>
            </AuthLink>
          </BottomGroup>
        </AuthForm>
      </BaseWrapper>
    );
  }
}

const mapStateToProps = (state: {
  auth: AuthInterface;
  errors: ErrorInterface;
}) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(
  compose(withRouter)(Register)
);
