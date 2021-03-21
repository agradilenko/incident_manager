import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { RouteComponentProps } from "react-router";
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

interface AuthInterface {
  isAuthenticated: boolean;
}

interface ErrorInterface {
  email?: string;
  password?: string;
  passwordincorrect?: string;
}

interface LoginProps {
  errors: ErrorInterface;
  auth: AuthInterface;
  loginUser: (arg0: { email: string; password: string }) => void;
}

interface LoginState {
  email: string;
  password: string;
  errors: ErrorInterface;
}

class Login extends Component<LoginProps & RouteComponentProps, LoginState> {
  state: LoginState
  constructor(props: LoginProps & RouteComponentProps) {
    super(props);
    this.state  = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps: {
    auth: { isAuthenticated: boolean };
    errors: ErrorInterface;
  }) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    this.setState({ email: e.currentTarget.value });
  };

  onSubmit = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    console.log(errors);

    return (
      <BaseWrapper>
        <AuthHeader>Sign in </AuthHeader>
        <AuthForm noValidate onSubmit={this.onSubmit}>
          <AuthGroup>
            <label>
              <AuthLabel>Email address</AuthLabel>
              <AuthInput
                name="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
              />
              <AuthError>
                {errors.email}
              </AuthError>
            </label>
          </AuthGroup>

          <AuthGroup>
            <label>
              <AuthLabel>Password</AuthLabel>
              <AuthInput
                name="password"
                type ="password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
              />
              <AuthError>
                {errors.password}
                {errors.passwordincorrect}
              </AuthError>
            </label>
          </AuthGroup>

          <div>
            <AuthButton type="submit">Login</AuthButton>
          </div>
          <BottomGroup>
            <AuthLink>
              <Link to="/register">Sign up</Link>
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

export default connect(mapStateToProps, { loginUser })(Login);
