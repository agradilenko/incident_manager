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
import { History } from "history";
import { compose } from "redux";

interface AuthInterface {
  isAuthenticated: boolean;
}

interface RegisterState {
  name: string;
  email: string;
  password: string;
  password2: string;
  position: string;
  errors: ErrorInterface;
}

interface ErrorInterface {
  name?: string;
  email?: string;
  position?: string;
  password?: string;
  password2?: string;
}

interface RegisterProps {
  errors: ErrorInterface;
  auth: AuthInterface;
  registerUser: (
    arg0: {
      name: string;
      email: string;
      position: string;
      password: string;
      password2: string;
    },
    arg1: History<unknown>
  ) => void;
}

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

  onChange = (e: React.SyntheticEvent) => {
    // @ts-ignore

    this.setState({ [e.target.name]: e.target.value });
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

  // class Register extends Component {
  render() {
    const { errors } = this.state;
    console.log(errors);

    return (
      <BaseWrapper>
        <AuthHeader>Register Below</AuthHeader>
        <AuthForm noValidate onSubmit={this.onSubmit}>
          <AuthGroup>
            <label>
              <AuthLabel>Name</AuthLabel>
              <AuthInput
                name="name"
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                name="password"
                onChange={this.onChange}
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
                name="password2"
                onChange={this.onChange}
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
