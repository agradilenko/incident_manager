import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';
import { updateIncident } from '../../actions/incidentsActions';
import { getUsersList } from '../../actions/authActions';
import { dateFormat, IncidentEditForm } from './ModalEditIncident';
import { SimpleMap } from '../../utils/simple-map';

type Incident = {
    area: string;
    assignee?: string;
    dateCreated: string;
    dateDue: string | Moment;
    description: string;
    name: string;
    priority: string;
    status: string;
    __v: number;
    _id: string;
};

interface UserListInterface {
    title: string;
    value: string;
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

interface CollectionsPageProps {
    updateIncident: (incident: SimpleMap<any>) => void;
    getUsersList: () => void;
    userList: UserListInterface[];
    item: Incident;
    auth: Auth;
}

interface Values {
    area: string;
    assignee?: string;
    dateDue: Moment;
    description: string;
    name: string;
    priority: string;
    status: string;
}

interface AuthInterface {
    isAuthenticated: boolean;
    userList: UserListInterface[];
}

const EditIncidentFormWrapper: FunctionComponent<any> = (
    props: CollectionsPageProps
) => {
    const [visible, setVisible] = useState(false);
    const { getUsersList: getUsersListLocal, userList, item, auth } = props;
    console.log(auth);
    item.dateDue = moment(item.dateDue, dateFormat);

    useEffect(() => {
        getUsersListLocal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCreate = (values: Values) => {
        console.log(values);
        const resultData = {
            ...values,
            _id: item._id,
            dateDue: values.dateDue.format(dateFormat)
        };
        props.updateIncident(resultData);
        setVisible(false);
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
                icon={<EditOutlined />}
            />
            <IncidentEditForm
                initialValues={item}
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
    updateIncident,
    getUsersList
})(withRouter(EditIncidentFormWrapper));
