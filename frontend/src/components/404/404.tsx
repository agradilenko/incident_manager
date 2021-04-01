import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundWrapper from './404StyledComponents';

const NotFound = () => {
    return (
        <NotFoundWrapper>
            <Link to='/'>
                <b>Error</b>
            </Link>
            <br />
            <p>The requested page was not found on our server.</p>
            <p>
                Either you the url you typed in is incorrect, you do not have
                access privileges to the page, or the page you are looking for
                has been removed.
            </p>
        </NotFoundWrapper>
    );
};

export default NotFound;
