import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { createIncident } from '../../actions/incidentsActions';
import { withRouter } from 'react-router-dom';
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

interface userListInterface {
    title: string;
    value: string;
}

interface IncidentsPageProps {
    createIncident: (incident: SimpleMap<any>) => void;
    getUsersList: () => void;
    userList: userListInterface[];
}

interface authInterface {
    isAuthenticated: boolean;
    userList: userListInterface[];
}

const AddIncidentFormWrapper: FunctionComponent<any> = (
    props: IncidentsPageProps
) => {
    const [visible, setVisible] = useState(false);
    const { getUsersList, userList } = props;

    useEffect(() => {
        getUsersList();
    }, []);

    const onCreate = (values: any) => {
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
    auth: any;
    userList: authInterface;
    incident: Incident;
}) => ({
    incident: state.incident,
    userList: state.auth.usersNames
});

export default connect(mapStateToProps, {
    createIncident,
    getUsersList
})(withRouter(AddIncidentFormWrapper));
