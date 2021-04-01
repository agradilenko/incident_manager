interface AuthInterface {
    isAuthenticated: boolean;
}

interface ErrorInterface {
    email?: string;
    password?: string;
    passwordincorrect?: string;
    emailnotfound?: string;
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

export type { AuthInterface, ErrorInterface, LoginState, LoginProps };
