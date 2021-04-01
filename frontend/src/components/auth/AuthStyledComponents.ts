import styled from 'styled-components';

const BaseWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background: white no-repeat;
    background-image: url(https://images.unsplash.com/photo-1438804507856-d05d2d17e5b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80);
    background-size: contain;
`;

const AuthHeader = styled.div`
    color: black;
    padding: 1rem;
    font-size: 16px;
    text-align: center;
    margin-bottom: 1rem;
    font-weight: 500;
`;

const AuthForm = styled.form`
    width: 480px;
    background-color: white;
    border: 1px solid #e0e0e0;
    padding: 2rem;
`;

const AuthGroup = styled.div`
    margin-bottom: 1rem;
`;

const AuthLabel = styled.div`
    width: 100%;
    padding-right: 2rem;
    margin-bottom: 0.75rem;
    font-size: 14px;
    color: #616161;
    font-family: 'Oxygen Mono', monospace;
`;

const AuthInput = styled.input`
    background-color: #fafafa;
    border: 1px solid #fafafa;
    box-sizing: border-box;
    border-radius: 4px;
    height: 40px;
    width: 100%;
    line-height: 1.5em;
    outline: 0;
    transition: all 0.25s ease 0s;
    font-size: 16px;
    padding: 0 1rem;

    &:hover {
        border-color: #e0e0e0;
        transition: all 0.25s ease 0s;
    }

    &:focus {
        border-color: #1652f0;
        transition: all 0.25s ease 0s;
    }
`;

const AuthError = styled.div`
    margin-top: 0.5rem;
    color: #d9605a;
    font-family: 'Oxygen Mono', monospace;
    font-size: 14px;
`;

const AuthLabelEmpty = styled.label``;

const AuthButton = styled.button`
    height: 40px;
    margin-top: 1rem;
    color: #ffffff;
    background-color: #1652f0;
    border-color: #1652f0;
    border-radius: 4px;
    width: 100%;
    font-size: 16px;
    font-family: 'Oxygen Mono', monospace;
    transition: all 0.25s ease 0s;

    &:hover {
        background-color: #154de0;
        border-color: #154de0;
        transform: translateY(-2.5px);
        cursor: pointer;
        transition: all 0.25s ease 0s;
    }
`;

const BottomGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
`;

const AuthLink = styled.div`
    a {
        background-color: #fafafa;
        color: #616161;
        text-decoration: none;
        font-family: 'Oxygen Mono', monospace;
        transition: all 0.25s ease 0s;
        padding: 0.25rem;

        &:hover {
            color: #1652f0;
            transform: translateY(-2.5px);
            transition: all 0.25s ease 0s;
        }
    }
`;

export {
    BaseWrapper,
    AuthHeader,
    AuthForm,
    AuthGroup,
    AuthLabel,
    AuthInput,
    AuthButton,
    AuthError,
    BottomGroup,
    AuthLink,
    AuthLabelEmpty
};
