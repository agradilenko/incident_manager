import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Moment } from 'moment';
import { createIncident } from '../../actions/incidentsActions';
import { IncidentCreateForm, dateFormat } from './ModalCreateIncident';
import { getUsersList } from '../../actions/authActions';
import { SimpleMap } from '../../utils/simple-map';

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

interface Values {
    area: string;
    assignee?: string;
    dateDue: Moment;
    description: string;
    name: string;
    priority: string;
    status: string;
}

interface UserListInterface {
    title: string;
    value: string;
}

interface IncidentsPageProps {
    createIncident: (incident: SimpleMap<any>) => void;
    getUsersList: () => void;
    userList: UserListInterface[];
}

interface AuthInterface {
    isAuthenticated: boolean;
    userList: UserListInterface[];
}

interface User {
    id: string;
    name: string;
    iat: number;
    exp: number;
}

interface Auth {
    isAuthenticated: boolean;
    user: User;
    loading: boolean;
    users: [];
    usersNames: UserListInterface[];
}

const AddIncidentFormWrapper: FunctionComponent<any> = (
    props: IncidentsPageProps
) => {
    const [visible, setVisible] = useState(false);
    const { getUsersList: getUsersListLocal, userList } = props;

    useEffect(() => {
        getUsersListLocal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCreate = (values: Values) => {
        const resultData: SimpleMap<any> = {
            ...values,
            dateDue: values.dateDue.format(dateFormat)
        };
        props.createIncident(resultData);
        setVisible(false);
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                New Incident
            </Button>
            <IncidentCreateForm
                userNames={userList}
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

const mapStateToProps = (state: {
    auth: Auth;
    userList: AuthInterface;
    incident: Incident;
}) => ({
    incident: state.incident,
    userList: state.auth.usersNames
});

export default connect(mapStateToProps, {
    createIncident,
    getUsersList
})(withRouter(AddIncidentFormWrapper));
