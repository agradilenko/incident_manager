import { History } from 'history';

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

export type { AuthInterface, RegisterState, ErrorInterface, RegisterProps };
