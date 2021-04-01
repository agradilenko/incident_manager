import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { registerUser } from '../../actions/authActions';
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
    RegisterProps,
    RegisterState
} from './RegisterInterfaces';

class Register extends Component<
    RegisterProps & Route & RouteComponentProps,
    RegisterState
> {
    constructor(props: RegisterProps & Route & RouteComponentProps) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            position: '',
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        const { history, auth } = this.props;
        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: { errors: ErrorInterface }) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
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

        const { password, position, email, name } = this.state;
        const newUser = {
            name,
            email,
            position,
            password,
            password2: password
        };

        const { history, registerUser: registerUser1 } = this.props;
        registerUser1(newUser, history);
    };

    render() {
        const { errors } = this.state;
        const { name, email, position, password, password2 } = this.state;
        return (
            <BaseWrapper>
                <AuthHeader>Register Below</AuthHeader>
                <AuthForm noValidate onSubmit={this.onSubmit}>
                    <AuthGroup>
                        <AuthLabelEmpty>
                            <AuthLabel>Name</AuthLabel>
                            <AuthInput
                                name="name"
                                onChange={this.onChangeName}
                                value={name}
                                error={errors.name}
                            />
                            <AuthError>{errors.name}</AuthError>
                        </AuthLabelEmpty>
                    </AuthGroup>
                    <AuthGroup>
                        <AuthLabelEmpty>
                            <AuthLabel>Email address</AuthLabel>
                            <AuthInput
                                name="email"
                                onChange={this.onChangeEmail}
                                value={email}
                                error={errors.email}
                            />
                            <AuthError>{errors.email}</AuthError>
                        </AuthLabelEmpty>
                    </AuthGroup>
                    <AuthGroup>
                        <AuthLabelEmpty>
                            <AuthLabel>Position</AuthLabel>
                            <AuthInput
                                name="position"
                                onChange={this.onChangePosition}
                                value={position}
                                error={errors.position}
                            />
                            <AuthError>{errors.position}</AuthError>
                        </AuthLabelEmpty>
                    </AuthGroup>
                    <AuthGroup>
                        <AuthLabelEmpty>
                            <AuthLabel>Password</AuthLabel>
                            <AuthInput
                                type="password"
                                name="password"
                                onChange={this.onChangePassword}
                                value={password}
                                error={errors.password}
                            />
                            <AuthError>{errors.password}</AuthError>
                        </AuthLabelEmpty>
                    </AuthGroup>
                    <AuthGroup>
                        <AuthLabelEmpty>
                            <AuthLabel>Confirm Password</AuthLabel>
                            <AuthInput
                                type="password"
                                name="password2"
                                onChange={this.onChangePassword2}
                                value={password2}
                                error={errors.password2}
                            />
                            <AuthError>{errors.password2}</AuthError>
                        </AuthLabelEmpty>
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
    errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(
    compose(withRouter)(Register)
);
