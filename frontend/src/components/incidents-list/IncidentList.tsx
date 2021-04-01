import React, { Component } from 'react';
import { Button, Table } from 'antd';
import { connect } from 'react-redux';
import './IncidentList.css';
import moment, { Moment } from 'moment';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteIncident } from '../../actions/incidentsActions';
import EditIncidentFormWrapper from '../modal-edit-incidents/ModalEditingForm';

type Incident = {
    area?: string;
    assignee?: string;
    dateCreated?: string;
    dateDue?: string | Moment;
    description?: string;
    name?: string;
    priority?: string;
    status?: string;
    __v?: number;
    _id?: string;
};

interface IncidentListProps {
    incidents: Incident[];
    deleteIncident: (_id: string) => void;
}

interface IncidentListState {
    incident: Incident;
    incidents: Incident[];
}

class IncidentList extends Component<IncidentListProps, IncidentListState> {
    constructor(props: IncidentListProps) {
        super(props);
        this.state = {
            incidents: [],
            incident: {}
        };
    }

    openEditDrawer = (incident: Incident) => {
        this.setState({ incident: incident });
    };

    render() {
        const { incidents } = this.props;
        return (
            <div>
                <Table
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name'
                        },
                        {
                            title: 'Assignee',
                            dataIndex: 'assignee',
                            key: 'assignee'
                        },
                        {
                            title: 'Area',
                            dataIndex: 'area',
                            key: 'area'
                        },
                        {
                            title: 'StartDate',
                            dataIndex: 'dateCreated',
                            key: 'dateCreated',
                            render: (data: string, item: Incident) => {
                                return moment(item.dateCreated).format(
                                    'DD.MM.YYYY'
                                );
                            }
                        },
                        {
                            title: 'dateDue',
                            dataIndex: 'dateDue',
                            key: 'dateDue',
                            render: (data: string | Moment, item: Incident) => {
                                if (typeof item.dateDue == 'string') {
                                    return item.dateDue;
                                } else
                                    return moment(item.dateDue).format(
                                        'DD.MM.YYYY'
                                    );
                            }
                        },
                        {
                            title: 'Description',
                            dataIndex: 'description',
                            key: 'description'
                        },
                        {
                            title: 'Priority',
                            dataIndex: 'priority',
                            key: 'priority'
                        },
                        {
                            title: 'Icon',
                            dataIndex: 'icon',
                            key: 'icon',
                            render: (data: unknown, item: Incident) => {
                                return <div className={item?.priority} />;
                            }
                        },
                        {
                            title: 'Status',
                            dataIndex: 'status',
                            key: 'status'
                        },
                        {
                            title: 'Action',
                            key: 'action',
                            render: (data: unknown, item: Incident) => {
                                return (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Button
                                            onClick={() => {
                                                this.props.deleteIncident(
                                                    item._id
                                                );
                                            }}
                                            icon={<DeleteOutlined />}
                                        />
                                        <EditIncidentFormWrapper item={item} />
                                    </div>
                                );
                            }
                        }
                    ]}
                    dataSource={incidents}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: { incidents: { incidents: Incident[] } }) => ({
    incidents: state.incidents.incidents
});

export default connect(mapStateToProps, { deleteIncident })(IncidentList);
