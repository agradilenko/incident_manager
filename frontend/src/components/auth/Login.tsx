import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { loginUser } from '../../actions/authActions';
import {
    AuthButton,
    AuthError,
    AuthForm,
    AuthGroup,
    AuthHeader,
    AuthInput,
    AuthLabel,
    AuthLabelEmpty,
    AuthLink,
    BaseWrapper,
    BottomGroup
} from './AuthStyledComponents';
import {
    AuthInterface,
    ErrorInterface,
    LoginProps,
    LoginState
} from './LoginInterfaces';

class Login extends Component<LoginProps & RouteComponentProps, LoginState> {
    constructor(props: LoginProps & RouteComponentProps) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        const { history, auth } = this.props;
        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }
    }

    componentDidUpdate() {
        const { auth } = this.props;
        if (auth.isAuthenticated) {
            const { history } = this.props;
            history.push('/dashboard');
        }
    }

    onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: e.currentTarget.value });
    };

    onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: e.currentTarget.value });
    };

    onSubmit = (
        e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const { password, email } = this.state;
        const userData = {
            email,
            password
        };

        const { loginUser: loginUser1 } = this.props;
        loginUser1(userData);
    };

    render() {
        const { errors } = this.props;
        const { email, password } = this.state;

        return (
            <BaseWrapper>
                <AuthHeader>Sign in </AuthHeader>
                <AuthForm noValidate onSubmit={this.onSubmit}>
                    <AuthGroup>
                        <AuthLabelEmpty>
                            <AuthLabel>Email address</AuthLabel>
                            <AuthInput
                                name="email"
                                onChange={this.onChangeEmail}
                                value={email}
                                error={errors.email}
                            />
                            <AuthError>
                                {errors.email}
                                {errors.emailnotfound}
                            </AuthError>
                        </AuthLabelEmpty>
                    </AuthGroup>

                    <AuthGroup>
                        <AuthLabelEmpty>
                            <AuthLabel>Password</AuthLabel>
                            <AuthInput
                                name="password"
                                type="password"
                                onChange={this.onChangePassword}
                                value={password}
                                error={errors.password}
                            />
                            <AuthError>
                                {errors.password}
                                {errors.passwordincorrect}
                            </AuthError>
                        </AuthLabelEmpty>
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
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
