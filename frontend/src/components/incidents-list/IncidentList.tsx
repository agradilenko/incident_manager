import React, { Component } from "react";
import { Button, Table } from "antd";
import { connect } from "react-redux";
import "./IncidentList.css";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteIncident } from "../../actions/incidentsActions";
import { log } from "util";

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

interface IncidentListProps {
  incidents: Incident[];
  deleteIncident: (_id: string) => void;
}

interface IncidentListState {
  hasData: boolean;
}

class IncidentList extends Component<IncidentListProps, IncidentListState> {
  constructor(props: IncidentListProps) {
    super(props);
    this.state = {
      hasData: true,
    };
  }

  render() {
    // @ts-ignore
    const { incidents } = this.props.incidents;
    console.log(incidents);
    return (
      <div>
        <Table
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Assignee",
              dataIndex: "assignee",
              key: "assignee",
            },
            {
              title: "Area",
              dataIndex: "area",
              key: "area",
            },
            {
              title: "StartDate",
              dataIndex: "dateCreated",
              key: "dateCreated",
              render: (data: any, item: Incident) => {
                return moment(item.dateCreated).format("DD.MM.YYYY");
              },
            },
            {
              title: "DueDate",
              dataIndex: "dateDue",
              key: "dateDue",
            },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
            },
            {
              title: "Priority",
              dataIndex: "priority",
              key: "priority",
            },
            {
              title: "Icon",
              dataIndex: "icon",
              key: "icon",
              render: (data: any, item: Incident) => {
                return <div className={item?.priority} />;
              },
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
            },
            {
              title: "Action",
              key: "action",
              render: (data: any, item: any) => {
                return (
                  <span>
                    <Button
                      onClick={() => {
                        this.props.deleteIncident(item._id);
                      }}
                      icon={<DeleteOutlined />}
                    />
                  </span>
                );
              },
            },
          ]}
          dataSource={this.state.hasData ? incidents : null}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: { incidents: Incident[] }) => ({
  incidents: state.incidents,
});

export default connect(mapStateToProps, { deleteIncident })(IncidentList);
