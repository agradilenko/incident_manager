import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import { getIncidents } from '../../actions/incidentsActions';
import IncidentList from '../incidents-list/IncidentList';
import 'antd/dist/antd.css';
import AddIncidentFormWrapper from '../modal-create-incident/ModalCreateIncidentWrapper';
import {
    BrandHeader,
    BrandHeaderSub,
    DashBoardContentContainer,
    DashBoardHeader,
    DashBoardWrapper,
    IncidentListContainer,
    LeftTopNav,
    LogoutButton,
    RightTopNav
} from './DashBoardStyled';

interface AuthInterface {
    isAuthenticated: boolean;
}

type Incident = {
    area: string;
    assignee?: string;
    dateCreated: string;
    dateDue: string;
    description: string;
    name: string;
    priority: string;
    status: string;
    __v: number;
    _id: string;
};

interface IProps {
    logoutUser: () => void;
    getIncidents: () => void;
}
interface IState {}

class Dashboard extends Component<IProps, IState> {
    componentDidMount() {
        const { getIncidents: getIncidents1 } = this.props;
        getIncidents1();
    }

    onLogoutClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const { logoutUser: logoutUser1 } = this.props;
        logoutUser1();
    };

    render() {
        return (
            <DashBoardWrapper>
                <DashBoardHeader>
                    <LeftTopNav>
                        <Link to="/dashboard">
                            <BrandHeader>
                                Incident Manager
                                <BrandHeaderSub>
                                    by Gradilenko Artem
                                </BrandHeaderSub>
                            </BrandHeader>
                        </Link>
                    </LeftTopNav>
                    <RightTopNav>
                        <LogoutButton onClick={this.onLogoutClick}>
                            Logout
                        </LogoutButton>
                    </RightTopNav>
                </DashBoardHeader>
                <DashBoardContentContainer>
                    <IncidentListContainer>
                        <IncidentList />
                        <AddIncidentFormWrapper />
                    </IncidentListContainer>
                </DashBoardContentContainer>
            </DashBoardWrapper>
        );
    }
}

const mapStateToProps = (state: {
    auth: AuthInterface;
    incidents: Incident[];
}) => ({
    auth: state.auth,
    incidents: state.incidents
});

export default connect(mapStateToProps, { logoutUser, getIncidents })(
    Dashboard
);
